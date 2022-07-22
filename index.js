/*=============================================
=            HELPFUL COMMENTS            =
=============================================*/
// using require to import => we are importing CommonJS module

//const express = require("express");

// using import keyword to import => we are importing ES module

/*=============================================
=           IMPORTS           =
=============================================*/
import express, { query } from "express";
import cors from "cors";
import uniqueId from "uniqueid";

import { filterDestinations } from "./Helpers/filters.js";
import { checkRequiredFields, isValidRequiredField } from "./Helpers/validators.js";
import { getPhotoUrl } from "./Helpers/third_party_api.js";




/*=============================================
=            VARIABLES(GLOBAL)            =
=============================================*/
const server = express(); // This server is deaf
import { check, validationResult} from 'express-validator';
const PORT = process.env.PORT || 3000;
const destinationsDB = {
    123456: {
      destination: "Eiffel Tower",
      location: "Paris",
      photo:
        "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    234567: {
      destination: "Big Ben",
      location: "London",
      photo:
        "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
   },
  123451: {
      destination: "Kigali Arena",
      location: "Kigali Rwanda",
      photo: "https://images.unsplash.com/photo-1648708511872-5426c0f29c27?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1531&q=80",
  }, 
      123452: {
          destination: "Taj Mahal",
          location: "Agra India",
          photo: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
      },
      123453: {
          destination: "Downtown Shibuya",
          location: "Shibuya Japan",
          photo: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
      }
  };
  
  /*=============================================
  =            PORT            =
  =============================================*/
// Told the server to listen on port available (when deployed) or 3000 when local
server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
 }) 
 
 /*=============================================
 =            MIDDLEWARES            =
 =============================================*/
server.use(cors());
server.use(express.json());

/*=============================================
=            ROUTES            =
=============================================*/
// CREATE 
//Test your endpoint by going to localhost:3000/destinations
server.get("/destinations", (req, res) => {
    const city = req.query.city

    filterDestinations({ city, destinationsDB, res});
})

// READ => DO THIS
// GET /destinations => send back the whole db
// localhost:3000/destinations/city/Atlanta
server.get("/destinations/city/:myCity", (req, res) => {
    // TODO: Check for a city quiery parameter
    const city = req.query.city

    //TODO: If there is a city query parameter, filter destination by the city
    if (city !== undefined) {
        const filteredDests = filter({
            objectToFilter: destinationsDB,
            filterValue: city,
        });
        res.send(filteredDests);
    } else {
        //TODO: otherwise just send the whole database
        res.send(destinationsDB);
    } 
});
server.get("/destinations/city/:myCity", (req, res) => {
    // log the city passed in the url as a named route parameter
    const city = req.params.myCity;
    console.log(city);


    filterDestinations({ city, destinationsDB, res});
});

server.post("/destinations", checkRequiredFields, async (req, res) => {
    const { location, destination, description } = req.body;   
    const photo = await getPhotoUrl({ location, destination});

    const newDest = {
        location,
        destination,
        photo,
        description: description ? description : "",

    };

    // if(description) {
    //     newDest.description = description
    // } else {
    //     newDest.description
    // }

        const id = uniqueId();
        destinationsDB[id] = newDest;
        res.send({ message: "success" });
});

// server.post(
//     '/destinations', [
//         check('location')
//         .notEmpty()
//         .withMessage('Location cannot be empty!')
//         .isAlpha()
//         .withMessage('Location can only contain letters!'),

//         check('destination')
//         .notEmpty()
//         .withMessage('Destination cannot be empty!')
//         .isAlpha()
//         .withMessage('Destination can only contain letters')
//     ],(req, res) => {

//         const errors = validationResult(req);
//         console.log(errors);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//         const { location, destination } = req.body;
//         if (location && destination) {
//             try {
//                 destinationsDB.promise().query(`INSERT INTO DESTINATIONS VALUES('${location}', '${destination}')`);
//                res.status(201).send({ msg: 'Created Destination' });
//             } 
//             catch (error) {
//                 console.log(error);
//             }
//         }
// },
// );

// Implement PUT /destinations/:id that will process requests to update a specific record, given its unique “id” (i.e. the 6 digit string in our DB object)
// HINT: would this endpoint need to also receive any body payload?
// HINT: if either the location or the destination needs updating, what else do you think you will need to update as a result?

server.put(
    "/destinations/:id",
     (req, res, next) => {
    // const { location, destination} = req.body;
    const location = req.body.location;
    if (location && !isValidRequiredField(location)) {
        return res
        .status(400)
        .send({ error: "location is required and has to be a valid textt"});
    }

    const destination = req.body.destination;

    if (destination !== undefined && !isValidRequiredField(destination)) {
        return res.status(400)
        .send({ error: "destination is requiresd and has to be a valid text"});

    }
    next();


}, 
async (req, res) => {
    const id = req.params.id;
    const { location, destination, description } = req.body;

    let hasLocOrDestChanged = false;

    if (location) {
        hasLocOrDestChanged = true;
        destinationsDB[id].location = location;
    }

    if (destination) {
        hasLocOrDestChanged = true;
        destinationsDB[id].destination = destination;
    }

    if (hasLocOrDestChanged) {
        const {location, destination} = destinationsDB[id];
        const photo = await getPhotoUrl({ location, destination});
        destinationsDB[id].photo = photo;
    }
    if (description) {
        destinationsDB[id].description = description;
    }
    res.send({ message: "success"});

}
);



// DELETE (OPTIONAL)
server.delete('/destinations/:id', (req, res) => {
    const {id} = req.params;
    delete destinationsDB[id];
    res.send({ message: "Deletion Successful"})
});
