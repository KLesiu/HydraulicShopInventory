console.log("This scripts generates some test hydraulic items to database")

const userArgs = process.argv.slice(2)
const Chuck = require("./models/chucks")
const Muff = require("./models/muffs")
const Node = require("./models/nodes")
const Plug = require("./models/plugs")
const Screw = require("./models/screws")
const Tee = require("./models/tees")


const chucks = []
const muffs = []
const nodes = []
const plugs = []
const screws = []
const tees = []


const mongoose = require("mongoose")

mongoose.set("strictQuery",false)

const mongoDB = userArgs[0]


main().catch((err)=>console.log(err))

async function main(){
    console.log("Debug: About to connect")
    await mongoose.connect(mongoDB)
    console.log("Debug: Should be connected?")
    await createChucks();
    await createTees()
    await createMuffs();
    await createNodes();
    await createPlugs();
    await createScrews();
    
    

    console.log("Debug: Closing mongoose")
    mongoose.connection.close()
}


async function chuckCreate(name,material,price,size,r,availability,quantity){
   let chuckdetail ={
        name: name,
        material: material,
        price: price,
        size: size,
        r: r,
        availability: availability,
        quantity: quantity
    }
    const chuck = new Chuck(chuckdetail)
    await chuck.save()
    chucks.push(chuck)
    console.log(`Added chuck: ${name}`)
}

async function muffCreate(name,type,material,price,availability,quantity){
    let muffdetail = {
        name: name,
        type: type,
        material: material,
        price: price,
        availability: availability,
        quantity: quantity
    }
    const muff = new Muff(muffdetail)
    await muff.save()
    muffs.push(muff)
    console.log(`Added muff: ${name}`)
}

async function nodeCreate(name,type,material,price,fi,availability,quantity){
    let nodedetail = {
        name: name,
        type: type,
        material: material,
        price: price,
        fi: fi,
        availability: availability,
        quantity: quantity
    }
    const node = new Node(nodedetail)
    await node.save()
    nodes.push(node)
    console.log(`Added node: ${name}`)

}

async function plugCreate(name,material,price,size,availability,quantity){
    let plugdetail = {
        name: name,
        material: material,
        price: price,
        size: size,
        availability: availability,
        quantity: quantity
    }
    const plug = new Plug(plugdetail)
    await plug.save()
    plugs.push(plug)
    console.log(`Added plug: ${name}`)
}

async function screwCreate(name,type,material,price,size,availability,quantity){
    let screwdetail = {
        name: name,
        type: type,
        material: material,
        price: price,
        size: size,
        availability: availability,
        quantity: quantity
    }
    const screw = new Screw(screwdetail)
    await screw.save()
    screws.push(screw)
    console.log(`Added screw: ${name}`)
}

async function teeCreate(name,material,price,size,availability,quantity){
    let teedetail = {
        name: name,
        material: material,
        price: price,
        size: size,
        availability: availability,
        quantity: quantity
    }
    const tee = new Tee(teedetail)
    await tee.save()
    tees.push(tee)
    console.log(`Added tee: ${name}`)
}

async function createChucks(){
    console.log("Adding chucks")
    await Promise.all([
        chuckCreate("Uchwyt-obejma","guma",15,"6","159-167",true,57),
        chuckCreate("Uchwyt-obejma podwójny","guma",7,"3/8","none",true,100)
    ])
}
async function createMuffs(){
    console.log("Adding muffs")
    await Promise.all([
        muffCreate("Mufa","GZ 40-1","PP",46,true,98),
        muffCreate("Mufa","GW 40-1","PP",44,false,0)
    ])
}
async function createNodes(){
    console.log("Adding nodes")
    await Promise.all([
        nodeCreate("Kolanko","nyplowe 45*","PP",16,"40mm",true,287),
        nodeCreate("Kolanko","nyplowe 90*","PP",12,"40mm",true,15)
    ])
}
async function createPlugs(){
    console.log("Adding plugs")
    await Promise.all([
        plugCreate("Zaślepka","PP",38,90,true,64),
        plugCreate("Zaślepka","PP",18,75,true,72)
    ])
}
async function createScrews(){
    console.log("Adding screws")
    await Promise.all([
        screwCreate("Śrubunek FV GW 50-1","mufowy","PP",142,"1/2'",true,71),
        screwCreate("Śrubunek FV GZ 40-1","mufowy","PP",110,"1/4'",true,2)
    ])
}
async function createTees(){
    console.log("Adding tees")
    await Promise.all([
        teeCreate("Trójnik","PP",1,"16",true,21),
        teeCreate("Trójnik","PP",30,"75",true,21)
    ])
}