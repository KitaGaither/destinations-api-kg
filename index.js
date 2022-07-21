// using require to import => we are importing CommonJS module
//const express = require("express");

// using import keyword to import => we are importing ES module
import express from "express";
import cors from "cors";
import { filterObj as filter } from "./helpers.js";

const server = express(); // This server is deaf

server.use(cors());

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
};

// CREATE (OPTIONAL)
//Test your endpoint by going to localhost:3000/destinations
server.get("/destinations", (req, res) => {
    res.send(destinationsDB)
})

// READ => DO THIS
// GET /destinations => send back the whole db
server.get("/destinations", (req, res) => {
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


// UPDATE (OPTIONAL)

// DELETE (OPTIONAL)