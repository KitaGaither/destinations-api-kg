// using require to import => we are importing CommonJS module
//const express = require("express");

// using import keyword to import => we are importing ES module
import express from "express";
import cors from "cors";
import { filterDestinations } from "./helpers.js";

const server = express(); // This server is deaf

// Middleware setup
server.use(cors());
server.use(express.json());


const PORT = process.env.PORT || 3000;

// Told the server to listen on port available (when deployed) or 3000 when local
server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
 }) 

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


// CREATE (OPTIONAL)
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



// UPDATE (OPTIONAL)
server.post("/destinations", (req, res) => {
console.log(req.body);
});


// DELETE (OPTIONAL)