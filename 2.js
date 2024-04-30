// barneysFarm <- tutorial farm
window.DoneStartingTutorial = false

window.waterAllCrops = async function (cropEntName) {
    let crops = getMapCrops()
    let crops_ = []

    crops.forEach(crop => {
        crops_.push(crop)
    })

    for (let i = 0; i < crops_.length; i++) {
        let crop = crops_[i]
        let slot, _ = getEquippedItemSlot("itm_rustyWateringCan")

        if (slot === null) {
            console.log("No watering can")
            break
        }

        eventManager.ZP.sendEvent(eventManager.qM.PLAYER_USED_ITEM,{ 
            "item": {
                "id": "itm_rustyWateringCan",
                "inventorySlot": slot
            },
            "target": {
                "id": crop.mid,
                "mid": crop.mid,
                "type": "entity"
            },
            "client": {
                "key": cropEntName,
                "entityType": "crop",
                "cropState": crop.state
            }
        })

        await new Promise(r => setTimeout(r, 500));
        // random wait from 0.1 to 0.3
        await new Promise(r => setTimeout(r, Math.random() * 200 + 100));
    }
}


async function startingTutorial () {
    notify("Starting tutorial...", 3000)

    await acceptTOS()

    await wait(500)

    let doneTutorial = false
    {
        let [slot, amount] = getEquippedItemSlot("itm_perfectPopberrySeeds")
        if (slot !== null && amount == 6) {
            doneTutorial = true
        }
    }

    await skipDialogUntilDisappear() 

    if (!doneTutorial) {

        await waterAllCrops("ent_cropPopberry")

        if (
            isItemInInventory("itm_rustyWateringCan")
        ) {
            console.log("Watering can already in inventory")
        } else {
            let crops = getMapCrops()
            let crops_ = []
            crops.forEach(crop => {
                crops_.push(crop)
            })

            if (crops_.length === 0) {
                await talkToNpcUntilItemInInventory("ent_npcBarney", "itm_perfectPopberrySeeds")
            }
             // talk to the npc
            
            await wait(500)
            
            await plantCrop("itm_perfectPopberrySeeds", "ent_cropPopberry") // plant the crop
            
            // talk to the npc
            await wait(500)
            

            await talkToNpc("ent_npcBarney")
            
            await wait(1000)

            await skipDialogUntilDisappear()

            await wait(500)
            
            await talkToNpcUntilItemInInventory("ent_npcBarney", "itm_rustyWateringCan")

            notify("Watering can obtained!", 3000)
        }

        await waterAllCrops("ent_cropPopberry")

        await wait(500)

        if (!isItemInInventory("itm_shears")) {
                
            await skipDialogUntilDisappear()
            await waterAnyCropThatNeedsWater("ent_cropPopberry")
            await waterAllCrops("ent_cropPopberry")
            
            await wait(500)
            
            await talkToNpc("ent_npcBarney")

            await wait(500)
            
            await skipDialogUntilDisappear()

            await wait(500)

            await talkToNpcUntilItemInInventory("ent_npcBarney", "itm_fertilizer")

            await wait(500)

            await useFertilizer()

            // wait until crop ripe

            // console.log("Waiting for crop to ripe")

            notify("Waiting for crop to ripe...", 3000)

            while (true) {
                let ripedCrops = getRipedCrops()
                if (ripedCrops.length > 0) {
                    break
                }

                await wait(500)
            }

            await wait(500)

            await talkToNpcUntilItemInInventory("ent_npcBarney", "itm_shears")

            notify("Shears obtained!", 3000)

        }

        await skipDialogUntilDisappear()
        await harvestAnyRipedCrop("ent_cropPopberry")
        
        await wait(500)

        await talkToNpc("ent_npcBarney")

        await wait(500)

        await skipDialogUntilDisappear()
        
        await wait(500)

        await eatFood("itm_popberryFruit")

        await wait(500)

        await talkToNpc("ent_npcBarney")

        await wait(2000)

        await skipDialogUntilDisappear()

        await wait(2000)

        await skipDialogUntilDisappear()
        
        await wait(2000)

        await skipDialogUntilDisappear()

    }

    notify("Tutorial done!", 3000)

}


(async function() {
    updateStatus("Starting tutorial...")
    let mapName = await getCurrentMapName()

    if (mapName === "barneysFarm") {
        await startingTutorial()
        mapName = await getCurrentMapName()
        console.log("Done with game tutorial")
        updateStatus("Done with game tutorial")

        setTimeout(async () => {
            let mapName = await getCurrentMapName()
            if (mapName === "barneysFarm") {
                await warpMap("PLOTInterior")
            }
        }, 10000)
    } else {
        console.log("Already done with game tutorial")

        notify("Already done with game tutorial...", 3000)
    }

    while (mapName == "barneysFarm") {
        await wait(500)
        mapName = await getCurrentMapName()
    }

    await wait(2000)

    if (!isQuestDone("qst_RangerDale")) {
        updateStatus("Starting Ranger Dale quest...")
        await talkToNpcForQuest("ent_npcRanger_Dale", "qst_RangerDale")
        notify("Ranger Dale quest done!", 3000)
    }
    
    await wait(500)

    if (!isQuestDone("qst_HazelsShop")) {
        updateStatus("Starting Hazel's Shop quest...")
        await talkToNpcForQuest("ent_npcHazel", "qst_HazelsShop")
        notify("Hazel's Shop quest done!", 3000)
    }

    
    if (!isQuestDone("qst_axeTutorial") && !isItemInInventory("itm_axe")) {
        updateStatus("Starting axe tutorial...")
        await skipDialogUntilDisappear()
        await talkToNpcUntilItemInInventory("ent_npcLorraine_the_Lumberjill", "itm_axe")

        notify("Axe obtained!", 3000)

        await wait(500)
    }

    mapName = await getCurrentMapName()

    if (!isQuestDone("qst_axeTutorial") && window.doAxeTutorial) {
        updateStatus("Chopping trees...")
        console.log("Starting axe tutorial")
        notify("Starting axe tutorial...", 3000)
        await teleportToTerravillaAndWaitIfNotThere()

        let [slot, _] = getEquippedItemSlot("itm_wood")

        while (slot === null) {
            notify("Chopping all trees...", 12000)
            await chopAllTrees()
            console.log("Chopped all trees!")
            notify("Chopped all trees!", 3000)
            await collectWoodDrops()
            console.log("Collected all wood drops!")
            notify("Collected all wood drops!", 3000)

            await wait(500)
            slot, _ = getEquippedItemSlot("itm_wood")
        }

    
        await talkToNpcForQuest("ent_npcLorraine_the_Lumberjill", "qst_axeTutorial")
        notify("Axe tutorial done!", 3000)
    }

    // // ent_npcStan_Stolar

    if (!isQuestDone("qst_woodworkingTutorial") && window.doWoodWorkingTutorial) {
        updateStatus("Starting woodworking tutorial...")
        notify("Starting woodworking tutorial...", 3000)
        console.log("Starting woodworking tutorial")
        await teleportToTerravillaAndWaitIfNotThere()

        await talkToNpc("ent_npcStan_Stolar")

        await wait(2000)

        await skipDialogUntilDisappear()

        const neededSticksAmount = 8

        if (!isItemInInventory("itm_Wooden_Stool")) {
            let woodworkBench = getMapEntitiesByGameEntityId("ent_woodwork")[0]
            let [_, sticksAmount] = getEquippedItemSlot("itm_stick")

            notify("Crafting sticks...", 30000)
            updateStatus("Crafting sticks...")

            while (sticksAmount < neededSticksAmount) {
                await skipDialogUntilDisappear()

                await craftAndWaitToClaim(woodworkBench.mid,["ach_Stick",
                1])

                await wait(1000)
                
                let [_, sticksAmount_] = getEquippedItemSlot("itm_stick")
                sticksAmount = sticksAmount_
            } 

            console.log("Done crafting sticks")
            notify("Done crafting sticks!", 3000)
        
            await talkToNpc("ent_npcStan_Stolar")

            await wait(2000)

            await skipDialogUntilDisappear()

            notify("Crafting Wooden Stool...", 30000)
            updateStatus("Crafting Wooden Stool...")
            
            await craftAndWaitToClaim(woodworkBench.mid,["ach_Wooden_Stool",
            1])

            await wait(1000)

            await talkToNpc("ent_npcStan_Stolar")

            await wait(2000)
    
            await skipDialogUntilDisappear()
            
        }
        

        await talkToNpc("ent_npcGurney")

        await wait(2000)

        await skipDialogUntilDisappear()

        await wait(500)

        await talkToNpcForQuest("ent_npcStan_Stolar", "qst_woodworkingTutorial")

        notify("Woodworking tutorial done!", 3000)
        updateStatus("Woodworking tutorial done!")

    }

    let trustScore = getTrustScore()

    if (trustScore < 300 && window.doYGGTutorial) {
        updateStatus("Starting YGG tutorial...")
        notify("Trust score is low, doing quests to increase it...", 3000)
        // guildhallinterior

        // async function teleportToGuildhallInteriorAndWaitIfNotThere() {
        //     let mapName = await getCurrentMapName()
        //     if (mapName !== "guildhallinterior") {
        //         await warpMap("guildhallinterior")
        //         notify("Teleporting to guildhall interior...", 3000)
        //     }

        //     await wait(5000)
        //     notify("Arrived at guildhall interior!", 3000)
        // }

        while (true) {
            try {
                isQuestExists("qst_ygg_01")
                break
            } catch (e) {
                await wait(500)
            }
        }
        
        // talk ent_npcPlayerW3
        if (!isQuestExists("qst_ygg_01")) {
            // await teleportToGuildhallInteriorAndWaitIfNotThere()
            await talkToNpc("ent_npcPlayerW3")
            await wait(500)
            await skipDialogUntilDisappear()

            notify("Starting YGG_1 quest...", 3000)
        }

        // talk ent_npcAMA_Luke
        if (!isQuestExists("qst_ygg_02")) {
            // await teleportToGuildhallInteriorAndWaitIfNotThere()
            await talkToNpc("ent_npcAMA_Luke")
            await wait(500)
            await skipDialogUntilDisappear()

            notify("Starting YGG_2 quest...", 3000)
        }

        // talk ent_npcGabbyYGG
        if (!isQuestExists("qst_ygg_03")) {
            // await teleportToGuildhallInteriorAndWaitIfNotThere()
            await talkToNpc("ent_npcGabbyYGG")
            await wait(500)
            await skipDialogUntilDisappear()

            notify("Starting YGG_3 quest...", 3000)
        }

        

        if (!isQuestDone("qst_ygg_01")) {
            updateStatus("Starting YGG_1 quest...")
            /**{
                "key": "ent_pickup_exploretool",
                "mouse": {
                    "x": 332,
                    "y": 478
                },
                "world": {
                    "x": 2149.5,
                    "y": 2559
                },
                "object": {
                    "x": 2148.854741633237,
                    "y": 2565.059886363426,
                    "width": 16,
                    "height": 16
                },
                "selfPlayer": {
                    "x": 2220.657245928766,
                    "y": 2543.6029742048368
                },
                "leftClick": true,
                "rightClick": false,
                "clickable": true,
                "entityId": "ent_pickup_exploretool",
                "type": "generic",
                "text": "",
                "useType": "entity",
                "entityType": "generic",
                "targetId": "65fb70f2d4b9b0c552f0e2ad"
            } */

            await warpMap("TerravillaEastCrossroads")

            await wait(5000)

            notify("Picking up ent_pickup_exploretool...", 5000)

            while (true) {
                try{
                    try {
                        let itemInInventory =isItemInInventory("itm_exploretool_01")
                        if (itemInInventory)
                            break
                    } catch (e) {
                        console.log("Item not in inventory")
                    }

                    let entities = []
                    while (entities.length === 0) {
                        try{
                            entities = getMapEntitiesByGameEntityId("ent_pickup_exploretool")
                            await wait(500)
                        }
                        catch (e) {
                            console.log("Error in getting entities: ", e)
                        }
                    }

                    // let entities = getMapEntitiesByGameEntityId("ent_pickup_exploretool")
                    if (entities.length > 0) {
                        let entity = entities[0]

                        eventManager.ZP.sendEvent(
                            eventManager.fb.GAME_OBJECT_CLICKED,
                            {
                                "key": "ent_pickup_exploretool",
                                "mouse": {
                                    "x": 332,
                                    "y": 478
                                },
                                "world": {
                                    "x": 2149.5,
                                    "y": 2559
                                },
                                "object": {
                                    "x": 2148.854741633237,
                                    "y": 2565.059886363426,
                                    "width": 16,
                                    "height": 16
                                },
                                "selfPlayer": {
                                    "x": 2220.657245928766,
                                    "y": 2543.6029742048368
                                },
                                "leftClick": true,
                                "rightClick": false,
                                "clickable": true,
                                "entityId": "ent_pickup_exploretool",
                                "type": "generic",
                                "text": "",
                                "useType": "entity",
                                "entityType": "generic",
                                "targetId": entity.mid
                            }
                            
                        )
                        
                        await wait(1000)
                    }

                    await wait(500)

                    await talkToNpc("ent_npcPlayerW3")

                    await wait(500)

                    await skipDialogUntilDisappear()

                    /**{
                        "item": {
                            "id": "itm_exploretool_01",
                            "inventorySlot": 7
                        },
                        "target": {
                            "id": "65fb6fc49c2033e1365ccc9a",
                            "mid": "65fb6fc49c2033e1365ccc9a",
                            "type": "entity"
                        },
                        "client": {
                            "key": "ent_pickup_fingerprint",
                            "entityType": "generic"
                        }
                    } */
                    // Find ent_pickup_fingerprint
                    

                        notify("YGG_1 quest done!", 3000)
                } catch (e) {
                    console.log("Error in YGG_1 quest: ", e)
                }
                }
            }
        }

        if (!isQuestDone("qst_ygg_02")) {
            updateStatus("Starting YGG_2 quest...")
            teleportToTerravillaAndWaitIfNotThere()
            

            notify("Picking up fingerprint...", 5000)

            await wait(5000)

            while (true) {

                try {
                    let itemInInventory =isItemInInventory("itm_fingerprint_01")
                    if (itemInInventory)
                        break
                } catch (e) {
                    console.log("Item not in inventory")
                }
                
                let entities = []
                while (entities.length === 0) {
                    try{
                        entities = getMapEntitiesByGameEntityId("ent_pickup_fingerprint")
                        await wait(500)
                    }
                    catch (e) {
                        console.log("Error in getting entities: ", e)
                    }
                }

                // let entities = getMapEntitiesByGameEntityId("ent_pickup_fingerprint")

                if (entities.length > 0) {
                    let entity = entities[0]

                    let [slot, _] = getEquippedItemSlot("itm_exploretool_01")

                    eventManager.ZP.sendEvent(
                        eventManager.qM.PLAYER_USED_ITEM,
                        {
                            "item": {
                                "id": "itm_exploretool_01",
                                "inventorySlot": slot
                            },
                            "target": {
                                "id": entity.mid,
                                "mid": entity.mid,
                                "type": "entity"
                            },
                            "client": {
                                "key": "ent_pickup_fingerprint",
                                "entityType": "generic"
                            }
                        }
                    )

                
                }
                await wait(1000)
            }

            await wait(500)

            await talkToNpc("ent_npcAMA_Luke")

            await wait(500)

            await skipDialogUntilDisappear()
        }

        if (!isQuestDone("qst_ygg_03")) {

            updateStatus("Starting YGG_3 quest...")
            // if (isItemInInventory("itm_hq_key")) {

            //     await warpMap("CHinterior")

            //     await wait(2000)

            //     let entities = getMapEntitiesByGameEntityId("ent_elevator")

            //     if (entities.length > 0) {
            //         let entity = entities[0]

            //         let [slot, _] = getEquippedItemSlot("itm_hq_key")

            //         eventManager.ZP.sendEvent(
            //             eventManager.qM.PLAYER_USED_ITEM,
            //             {
            //                 "item": {
            //                     "id": "itm_hq_key",
            //                     "inventorySlot": slot
            //                 },
            //                 "target": {
            //                     "id": entity.mid,
            //                     "mid": entity.mid,
            //                     "type": "entity"
            //                 },
            //                 "client": {
            //                     "key": "ent_elevator",
            //                     "entityType": "generic"
            //                 }
            //             }
            //         )
            //     }

            //     await wait(500)
            // }

            /**{
                "item": {
                    "id": "itm_exploretool_01",
                    "inventorySlot": 7
                },
                "target": {
                    "id": "65e76ffe99c035186f5be9e0",
                    "mid": "65e76ffe99c035186f5be9e0",
                    "type": "entity"
                },
                "client": {
                    "key": "ent_pickup_622AFF",
                    "entityType": "generic"
                }
            } */

            if (!isItemInInventory("itm_pixel_622AFF")) {
                await warpMap("MiningDungeon")
                await wait(3000)

                let entities = []

                while (entities.length === 0) {
                    try{
                        entities = getMapEntitiesByGameEntityId("ent_pickup_622AFF")
                        await wait(500)
                    }
                    catch (e) {
                        console.log("Error in getting entities: ", e)
                    }
                }

                // let entities = getMapEntitiesByGameEntityId("ent_pickup_622AFF")

                if (entities.length > 0) {
                    let entity = entities[0]

                    let [slot, _] = getEquippedItemSlot("itm_exploretool_01")

                    eventManager.ZP.sendEvent(
                        eventManager.qM.PLAYER_USED_ITEM,
                        {
                            "item": {
                                "id": "itm_exploretool_01",
                                "inventorySlot": slot
                            },
                            "target": {
                                "id": entity.mid,
                                "mid": entity.mid,
                                "type": "entity"
                            },
                            "client": {
                                "key": "ent_pickup_622AFF",
                                "entityType": "generic"
                            }
                        }
                    )
                }

                await wait(500)

            }

            await talkToNpc("ent_npcGabbyYGG")

            await wait(1000)

            await skipDialogUntilDisappear()

            notify("YGG_3 quest done!", 3000)

            await collectAllItems("ent_pickup_kongium")

            notify("Collected all ent_pickup_kongium!", 3000)

            await warpMap("guildhallinterior")

            await wait(5000)

            trustScore = getTrustScore()
            notify("Trust score is now: " + trustScore, 3000)
        }

        updateStatus("YGG tutorial done!")
        window.DoneStartingTutorial = true
})()
