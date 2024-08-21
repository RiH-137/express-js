use('crudDB');

db.createCollection("courses")


db.courses.insertOne({
    name: "Node.js",
    price: 100,
    assisgnments:12,
    project: 45
})

db.courses.insertMany(
    [
        
        {
            "_id": "786f741e4b21ab56d59gf34",
            "name": "Pyhon",
            "Price": 2000,
            "Instructor": "Alce"
        },
        {
            "_id": "89e7g52f5c32bc67e60hg45",
            "name": "Dat Science",
            "Price": 3000,
            "Instructor": "Bo"
        },
        {
            "_id": "90f8h963g643cd78f71ih56",
            "name": "Web Deelopment",
            "Price": 2200,
            "Instructor": "Charie"
        },
        {
            "_id": "12a9i074h7e54de89g82k67",
            "name": "Machine Learnig",
            "Price": 2800,
            "Instructor": "Davd"
        }
    ]
    
)


// Read data from the database
let a = db.courses.find({price:2800} )


//to return all inserted data
console.log(a.toArray());
console.log(a.count());

let b= db.courses.findOne({price:2000})






// Update data in the database
db.courses.updateOne({price:0},{$set:{price: 5000}})

db.courses.updateMany({price:2000},{$set:{price: 5000}})


// delete data from the database
db.courses.deleteOne({price: 5000})

db.courses.deleteMany({price: 5000})


// MONGODB OPERATORS --> Documentation




