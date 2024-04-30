// Function to initialize notifications
window.initNotifications = function () {
    // Create the notification container div
    window.notificationContainer = document.createElement('div');
    window.notificationContainer.id = 'notificationContainer';
    window.notificationContainer.style.position = 'fixed';
    window.notificationContainer.style.top = '20px'; // Adjust this value for desired vertical position
    window.notificationContainer.style.left = '0';
    window.notificationContainer.style.right = '0';
    window.notificationContainer.style.zIndex = '9998'; // Ensure it's on top of everything
    window.notificationContainer.style.display = 'flex';
    window.notificationContainer.style.justifyContent = 'center'; // Center horizontally
    window.notificationContainer.style.alignItems = 'center'; // Center vertically (optional)
  
    document.body.appendChild(window.notificationContainer);
}

window. notify = function (message, duration = 3000) {
if (!window.notificationContainer) {
    initNotifications();
}

const notificationDiv = document.createElement('div');
notificationDiv.style.backgroundColor = '#333';
notificationDiv.style.color = '#fff';
notificationDiv.style.borderRadius = '6px';
notificationDiv.style.padding = '12px 20px';
notificationDiv.style.textAlign = 'center';
notificationDiv.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
notificationDiv.style.fontFamily = 'Arial, sans-serif';
notificationDiv.style.fontSize = '16px';
notificationDiv.textContent = message;

const slideInFromTopKeyframes = `
    @keyframes slideInFromTop {
    0% {
        transform: translateY(-100%);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
    }
`;

const style = document.createElement('style');
style.type = 'text/css';
style.appendChild(document.createTextNode(slideInFromTopKeyframes));

document.head.appendChild(style);

notificationDiv.style.animation = 'slideInFromTop 0.3s ease forwards';

window.notificationContainer.appendChild(notificationDiv);

setTimeout(function() {
    notificationDiv.style.opacity = '0';
    notificationDiv.style.animation = 'none';

    setTimeout(function() {
    if (window.notificationContainer.contains(notificationDiv)) {
        window.notificationContainer.removeChild(notificationDiv);
    }
    }, 300); 
}, duration);
}

initNotifications();

notify('Decode hackery pixels.xyz tool loaded.', 3000);

// Function to initialize the status window
window.initStatus = function() {
// Create the status container div
window.statusContainer = document.createElement('div');
window.statusContainer.id = 'statusContainer';
window.statusContainer.style.position = 'fixed';
window.statusContainer.style.bottom = '20px';
window.statusContainer.style.left = '20px';
window.statusContainer.style.zIndex = '9999';
window.statusContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
window.statusContainer.style.color = '#fff';
window.statusContainer.style.padding = '12px 16px';
window.statusContainer.style.borderRadius = '8px';
window.statusContainer.style.fontFamily = 'Roboto, sans-serif';
window.statusContainer.style.fontSize = '16px';
window.statusContainer.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
window.statusContainer.style.opacity = '0';
window.statusContainer.style.transform = 'translateY(100%)';
window.statusContainer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
document.body.appendChild(window.statusContainer);
}

// Function to update the status text
window.updateStatus = function(message) {
if (!window.statusContainer) {
    initStatus();
}

window.statusContainer.textContent = message;
window.statusContainer.style.opacity = '1';
window.statusContainer.style.transform = 'translateY(0)';

// Add the 'updating' animation
const pulseAnimation = `
    @keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
    }
`;
const style = document.createElement('style');
style.type = 'text/css';
style.appendChild(document.createTextNode(pulseAnimation));
document.head.appendChild(style);
window.statusContainer.style.animation = 'pulse 1s infinite';

// Remove the 'updating' animation after a short delay
setTimeout(function() {
    window.statusContainer.style.animation = 'none';
    document.head.removeChild(style);
}, 500);
}

// Example usage
initStatus();
updateStatus('Decode pixels.xyz hackery tool loaded.');

// module numbers dict
const modulesDict = {
    "GameStateManager": 16562,
    "EventManager": 34377,
    "SceneManager": 4314,
    "HandlerManager": 86731,
    "StateStore": 80535,
    "GameManager": 70247,
    "PlayerInteractionManager": 71343
}

/**{
    "worldId": 6,
    "mapId": "terravilla"
} */

// setWorld

window.getModule = function (module) {
    return __webpack_require__(modulesDict[module])
}

window.initializeHook = function  () {
    window.orders = []

    // const originalMap = Array.prototype.map;
    window.originalMap = Array.prototype.map;

    Array.prototype.map = function() {
        const result = originalMap.apply(this, arguments);

        const isMapped = result.some(item => {
            if (item && typeof item === 'object') {
                return Object.keys(item).includes('reward');
            }
            return false;
        });

        if (isMapped) {
            console.log('Found orders:', result);

            window.orders = result
        }

        return result;
    };
}

window.reverseHook = function  () {
    Array.prototype.map = window.originalMap;
}

// Join CHInterior

// /"pixelsNFTFarm-247"
window.warpMap = async function (mapId) {

    if (mapId.includes("pixelsNFTFarm")) {
    
        eventManager.ZP.sendEvent(eventManager.fb.ROOM_WARP, {
            mapId: mapId
        })

        // Wait for soilNodes to load

        await wait(5000)

        while (true) {
            try {
                let soilNodes = getMapEntitiesByClass("SoilNode")
                if (soilNodes.length > 0) {
                    console.log("Soil nodes loaded")
                    break
                }
            } catch (e) {
                console.log(e)
            }

            await new Promise(r => setTimeout(r, 500));
        }

    } else {
        eventManager.ZP.sendEvent(eventManager.fb.ROOM_WARP, {
            mapId: mapId, world:432
        })

            
        await wait(5000)

        while (stateManager.playerSerializer == null) {
            await new Promise(r => setTimeout(r, 500));
        }

        while (stateManager.scene == null) {
            await new Promise(r => setTimeout(r, 500));
        }

        while (stateManager.playerSerializer.getState == null) {
            await new Promise(r => setTimeout(r, 500));
        }
    }

}

window.warpFarm = async function (farmId) {
    await warpMap(`pixelsNFTFarm-${farmId}`)

    while (true) {
        try {
            stateManager.scene.cursor.up.isDown = true
            await new Promise(r => setTimeout(r, Math.random() * 3000 + 2000));
            stateManager.scene.cursor.up.isDown = false

            stateManager.scene.cursor.left.isDown = true
            await new Promise(r => setTimeout(r, Math.random() * 1000 + 1000));
            stateManager.scene.cursor.left.isDown = false
            break
        } catch (e) {
            console.log(e)
        }

        await new Promise(r => setTimeout(r, 500));
    }
}

window.teleport = function (x,y) {
    stateManager.scene.selfPlayer.moveTo(x,y)
}

window.getEntities = function () {
    return stateManager.scene.entities
}

window.getSceneEntityByMid = function (mid) {
    let entities = getEntities()
    let entity = null

    for (const [key, value] of entities) {
        if (value.mid === mid) {
            entity = value
        }
    }

    return entity
}

window.openUI = function (ui) {
    eventManager.ZP.postEvent(eventManager.fb.PRESENT_UI, {
        ui: ui
    })
}

window.acceptTOS = async function () {
    // Enable every input type=checkbox
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        // click the checkbox
        checkbox.click();
    });

    await new Promise(r => setTimeout(r, 1000));

    // stateStore.dispatch({type:"game/SET_TOS_ACCEPTED"})

    // Wait for button with text Accept
    let acceptButton = document.querySelector('[class^="commons_pushbutton__"]')
    
    // Click the button
    if (acceptButton) {
        acceptButton.click();
    }
}

window.getPriceOfItem = function (itemId) {
    let storeItems = gameManager.getStore("str_bucksGalore").items

    for (let i = 0; i < storeItems.length; i++) {
        let item = storeItems[i]

        if (item.item === itemId) {
            return item.buyPrice
        }
    }
}

window.buyItem = function (itemId, quantity) {
    stateStore.dispatch({
        "type": "generalStoreModal/buyStoreItem",
        "payload": {
            "storeId": "str_bucksGalore",
            "itemId": itemId,
            "quantity": quantity
        }
    })    
}

window.getMapCrops = function () {
    return stateManager.scene.crops
}

window.getCurrentMapName = async function () {
    while (true) {
        try {
            if (gameManager) {
                if (gameManager.mapLibrary) {
                    if (gameManager.mapLibrary.id) {
                        return gameManager.mapLibrary.id
                    }
                }
            }
    
        } catch (error) {
            console.log(error)
        }
        
        await new Promise(r => setTimeout(r, 500));
    }
}

window.getMapEntitiesByClass = function (className) { // SoilNode, GenericNode, CropNode
    let scene = stateManager.scene
    let entities = []

    for (const [key, value] of scene.entities) {

        if (value.constructor.name == className) {
            entities.push(value)
        }
    }

    return entities
}

window.getMapEntitiesByGameEntityId = function (gameEntityId) {
    let scene = stateManager.scene
    let entities = []

    for (const [key, value] of scene.entities) {
        if (value.gameEntity){
            if (value.gameEntity.id == gameEntityId) {
                entities.push(value)
            }
        }
    }

    return entities
}

window.divideRoundUp = function (dividend, divisor) {
    const result = Math.floor(dividend / divisor); // Integer division
    const remainder = dividend % divisor; // Get the remainder
    if (remainder > 0) {
        return result + 1;
    }
    return result;
}

window.getMapEntitiesByEntityType = function (entityType) {
    let scene = stateManager.scene
    let entities = []

    for (const [key, value] of scene.entities) {
        if (value.entityType == entityType) {
            entities.push(value)
        }
    }

    return entities
}

window.getAllPlayerTrees = function () {
    let entities =  getMapEntitiesByClass("GenericEntityNode")

    let trees = []

    // if entity.gameEntity.id == "ent_playerTreeLand5v1"

    entities.forEach(entity => {
        if (entity.gameEntity.id.includes("playerTree")) {
            trees.push(entity)
        }
    })

    return trees
}



window.constructXYList = function (entities) {
    const xyList = [];
    entities.forEach(entity => {
        xyList.push({ x: entity.position.x, y: entity.position.y, mid: entity.mid });
    });
    return xyList;
}

window.organizeIntoGrid = function (entities) {
    let grid = [];
    let leftOverEntities = entities.slice(); // Create a copy of the original array

    while (leftOverEntities.length > 0) {
        let lowestY = leftOverEntities[0].y;

        // Find the lowest y value
        for (let i = 0; i < leftOverEntities.length; i++) {
            if (leftOverEntities[i].y < lowestY) {
                lowestY = leftOverEntities[i].y;
            }
        }

        let entitiesWithSameY = [];

        // Find entities with the lowest y value
        for (let i = 0; i < leftOverEntities.length; i++) {
            if (leftOverEntities[i].y === lowestY) {
                entitiesWithSameY.push(leftOverEntities[i]);
                // Remove the entity from the leftOverEntities
                leftOverEntities.splice(i, 1);
                i--; // Adjust the index as the array length has decreased
            }
        }

        // Sort entities by x value
        entitiesWithSameY.sort((a, b) => a.x - b.x);

        grid.push(entitiesWithSameY);
    }

    return grid;
}

window.getPlayerState = function () {
    return stateStore.getState().game.player
}

window.getTrustScore = function () {
    return getPlayerState().core.trustScore
}

window.getInventory = function () {
    let currentState = stateManager.playerSerializer.getState()
    let slots = currentState.inventory.slots["$items"]

    let inventory = []
    
    for (const [key, value] of slots) {
        inventory.push({
            slot: value.slot,
            item: value.item,
            quantity: value.quantity
        })
    }

    return inventory
}

window.getQuantity = function (itemName) {
    let inventory = getInventory()
    let quantity = 0

    inventory.forEach(item => {
        if (item.item === itemName) {
            quantity = item.quantity
        }
    })

    return quantity
}

window.getEquippedItemSlot = function (itemName) {
    let inventory = getInventory()
    let slot = null
    let quantity = 0

    inventory.forEach(item => {
        if (item.item === itemName) {
            slot = item.slot
            quantity = item.quantity
        }
    })


    return [slot,quantity]
}

window.getGameItem = function (itemName) {
    return gameManager.getGameItem(itemName)
}

window.getGameEntity = function (entityName) {
    return gameManager.getGameEntity(entityName)
}

window.getMapEntityByMid = function (mid) {
    let entities = getEntities()

    for (const [key, value] of entities) {
        if (value.mid === mid) {
            return value
        }
    }

    return null
}



window.equipItem = function (itemName) {
    let item = getGameItem(itemName)
    let data = getEquippedItemSlot(itemName)

    let slot = data[0]
    let quantity = data[1]

    if (slot === null) {
        return false
    }
        
    stateStore.dispatch(
    {
        "type": "storage/selectEquipment",
        "payload": {
            "selectedEquipment": slot,
            "item": item,
            "quantity": quantity
        }
    })

    return true
}

window.unequipItem = function () {
    stateStore.dispatch({
        type: "storage/resetEquipment",
        payload: {}
    })

    return true
}

window.getRipedCrops = function () {
    let crops = getMapCrops()
    let ripedCrops = []

    crops.forEach(crop => {
        if (crop.state === "ripe") {
            ripedCrops.push(crop)
        }
    })

    return ripedCrops
}

window.getNeedWaterCrops = function () {
    let crops = getMapCrops()
    let needWaterCrops = []

    crops.forEach(crop => {
        if (crop.needsWater) {
            needWaterCrops.push(crop)
        }
    })

    return needWaterCrops

}

window.checkIfSoilHasCrop = function (soilNode) {
    let crops = getMapCrops()
    let hasCrop = false

    
    // CHECK IF CROP IS PLANTED IN THAT SOIL NODE BY COMPARING POSITION OF CROP AND SOIL NODE, CROP POSITION X = SOIL POSITION X + 16, CROP POSITION Y = SOIL POSITION Y + 16


    crops.forEach(crop => {
        cropX = crop.x
        cropY = crop.y

        soilX = soilNode.x
        soilY = soilNode.y

        if (cropX === soilX + 16 && cropY === soilY + 16) {
            hasCrop = true
        }
    })

    return hasCrop
}

// generic.utcTarget = time when the crafting will be done
// state = "crafting" when crafting is in progress

/**[
    "ach_Stick",
    1
] */

window.startCrafting = function (mid, inputs) {
    let entity = getMapEntityByMid(mid)

    eventManager.ZP.sendEvent("clickEntity", {
        mid: mid,
        impact: "startCraft",
        inputs: inputs,
        entity: entity.entity,
    })

    entity = getMapEntityByMid(mid)
    console.log(entity.generic)
}



window.claimCrafting = function (mid) {
    let entity = getMapEntityByMid(mid)

    eventManager.ZP.sendEvent("clickEntity", {
        mid: mid,
        impact: "claim",
        entity: entity.entity,
    })
}

window.craftAndWaitToClaim = async function (mid, inputs) {
    // Wait for crafting to finish
    let entity = getMapEntityByMid(mid)

    while (entity.currentState.state === "crafting") {
        await new Promise(r => setTimeout(r, 500));
        entity = getMapEntityByMid(mid)
    }

    claimCrafting(mid)

    // start crafting

    startCrafting(mid, inputs)

    await new Promise(r => setTimeout(r, 1000));

    // Wait for crafting to finish
    entity = getMapEntityByMid(mid)

    while (entity.currentState.state === "crafting") {
        await new Promise(r => setTimeout(r, 500));
        entity = getMapEntityByMid(mid)
    }

    claimCrafting(mid)
}


window.talkToNpc = async function (npcId) {
    eventManager.ZP.sendEvent(eventManager.qM.PLAYER_CLICKED_NPC, {
        npcId: npcId,
        mid: ""
    });
}

window.dialogNext = function () {
    stateStore.dispatch({
        "type": "game/dialogNext"
    })
}

window.closeStoreModal = function () {
    stateStore.dispatch({
        "type": "generalStoreModal/closeStoreModal"
    })
}

window.goToStoreTab = function (tabName) {
    const buyButtons = document.querySelectorAll('[class^="Store_buyButton"]');
    buyButtons.forEach(button => {
        // Check if the button's text content is 'Orders'
        if (button.textContent.trim() === tabName) {
            // Click the button
            button.click();
        }
    });

}

// PostOfficeInterior

window.openStorage = function (mid) {
    stateStore.dispatch({
        "type": "game/PLAYER_OPEN_STORAGE",
        "payload": {
            "storageId": mid
        }
    })

}

window.closeStorage = function () {
    // InventoryWindow_closeBtn__ioczI

    let closeButton = document.querySelector('[class^="InventoryWindow_closeBtn__"]')

    if (closeButton) {
        closeButton.click()
    }
}

window.getSlots = function () {
    const slots = document.querySelectorAll('[class^="InventoryWindow_inventoryBox__"]');
}

window.newNextDialog = function () {
    // GameDialog_skip_

    let skipButton = document.querySelector('[class^="GameDialog_skip_"]')

    if (skipButton) {
        skipButton.click()
    
        return true
    }

    return false
}

window.skipDialogUntilDisappear = async function () {
    // GameDialog_content__dE2Xj

    let dialogContent = document.querySelector('[class^="GameDialog_content__"]')


    while (dialogContent !== null) {
        newNextDialog()
        dialogContent = document.querySelector('[class^="GameDialog_content__"]')

        await new Promise(r => setTimeout(r, 300));
        
    }

    return true
}


window.getOrders = async function () {
    initializeHook()

    let oldOrders = window.orders;

    closeStoreModal();
    openUI("str_bucksGalore");
    
    setTimeout(() => {
        goToStoreTab("Orders");
    }, 1000); // 1 second delay

    setTimeout(() => {
        console.log("Orders:", window.orders)
        closeStoreModal();
    }, 2000); // 2 second delay

    tries = 0
    while (window.orders.length === 0 && tries < 10) {
        tries += 1
        await new Promise(r => setTimeout(r, 500));
    }

    if (oldOrders == window.orders) {
        reverseHook()
        return null
    }

    let orders = window.orders

    reverseHook()
    return orders
}


window.plantCrop = async function (cropName, cropEntname) { // "itm_popberrySeeds", "ent_cropPopberry"
    
    let soilNodePositions = constructXYList(getMapEntitiesByClass("SoilNode"))
    let soilGrid = organizeIntoGrid(soilNodePositions)
    // teleport to each cell

    for (let i = 0; i < soilGrid.length; i++) {
        let noSeeds = false
        for (let j = 0; j < soilGrid[i].length; j++) {
            let soilNode = soilGrid[i][j]
            let hasCrop = checkIfSoilHasCrop(soilNode)
            if (hasCrop) {
                console.log("Soil Node has crop")
            } else {
                console.log("Soil Node does not have crop")
                
                let [slot, quantity] = getEquippedItemSlot(cropName)

                if (slot === null) {
                    console.log("No seeds")
                    noSeeds = true
                    break
                }

                eventManager.ZP.sendEvent(eventManager.qM.PLAYER_USED_ITEM,{ 
                    "item": {
                        "id": cropName, // "itm_popberrySeeds"
                        "inventorySlot": slot
                    },
                    "target": {
                        "id": soilNode.mid,
                        "mid": soilNode.mid,
                        "type": "entity"
                    },
                    "client": {
                        "key": cropEntname, // "ent_cropPopberry"
                        "entityType": "crop",
                        "cropState": "seed"
                    }
                })

                await new Promise(r => setTimeout(r, 500));
                // random wait from 0.1 to 0.5 seconds
                await new Promise(r => setTimeout(r, Math.random() * 200 + 100));         
            }
        }

        if (noSeeds) {
            break
        }
    }
}

window.isItemInInventory = function (itemId) {
    let inventory = getInventory()

    for (let i = 0; i < inventory.length; i++) {
        let item = inventory[i]
        if (item.item === itemId) {
            return true
        }
    }

    return false
}

window.talkToNpcUntilItemInInventory = async function (npcId, itemId) {

    while (true) {
        // If there are seeds in the inventory break
        if (isItemInInventory(itemId)) {
            break
        }

        await talkToNpc(npcId)
        
        await new Promise(r => setTimeout(r, 1000));
        
        await skipDialogUntilDisappear()


        await new Promise(r => setTimeout(r, 500));
    }
}



window.getBodyType = function () {
    return stateManager.scene.selfPlayer.propCache.key
}

window.eatFood = async function (cropRipedItemName) {
    let slot, _ = getEquippedItemSlot(cropRipedItemName)

    if (slot === null) {
        console.log("No food")
        return
    }

    eventManager.ZP.sendEvent(eventManager.qM.PLAYER_USED_ITEM,{ 
        "item": {
            "id": cropRipedItemName,
            "inventorySlot": slot
        },
        "target": {
            "type": "self"
        },
        "client": {
            "key": getBodyType()
        }
    })
}

window.useFertilizer = async function () {
    /**{
    "item": {
        "id": "itm_fertilizer",
        "inventorySlot": 1
    },
    "target": {
        "id": "661fa8133a24c56a5cef328d",
        "mid": "661fa8133a24c56a5cef328d",
        "type": "entity"
    },
    "client": {
        "key": "ent_cropPerfectPopberry",
        "entityType": "crop",
        "cropState": "healthy1"
    }
} */


    let slot, _ = getEquippedItemSlot("itm_fertilizer")

    if (slot === null) {
        console.log("No fertilizer")
        return
    }

    let crops = getMapCrops()
    let firstCrop = crops.entries().next().value[1];

    eventManager.ZP.sendEvent(eventManager.qM.PLAYER_USED_ITEM,{
        "item": {
            "id": "itm_fertilizer",
            "inventorySlot": slot
        },
        "target": {
            "id": firstCrop.mid,
            "mid": firstCrop.mid,
            "type": "entity"
        },
        "client": {
            "key": "ent_cropPerfectPopberry",
            "entityType": "crop",
            "cropState": "healthy1"
        }
    })

    await new Promise(r => setTimeout(r, 500));
}

window.waterAnyCropThatNeedsWater = async function (cropEntName) {
    
    needWaterCrops = getNeedWaterCrops()
    for (let i = 0; i < needWaterCrops.length; i++) {
        let crop = needWaterCrops[i]
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


window.harvestAnyRipedCrop = async function (cropEntName) {
    
    ripedCrops = getRipedCrops()
    for (let i = 0; i < ripedCrops.length; i++) {
        let crop = ripedCrops[i]
        let slot, _ = getEquippedItemSlot("itm_shears")

        if (slot === null) {
            console.log("No shears")
            break
        }

        eventManager.ZP.sendEvent(eventManager.qM.PLAYER_USED_ITEM,{ 
            "item": {
                "id": "itm_shears",
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

window.chopTree = function (treeEnt) {
    let slot, _ = getEquippedItemSlot("itm_axe")

    if (slot === null) {
        console.log("No axe")
        return
    }

    eventManager.ZP.sendEvent(eventManager.qM.PLAYER_USED_ITEM,{ 
        "item": {
            "id": "itm_axe",
            "inventorySlot": slot
        },
        "target": {
            "id": treeEnt.mid,
            "mid": treeEnt.mid,
            "type": "entity"
        },
        "client": {
            "key": treeEnt.gameEntity.id,
            "entityType": "generic"
        }
    })
}

window.isTreeChoopable = function (treeEnt) {
    treeEnt = getSceneEntityByMid(treeEnt.mid)

    let currentState = treeEnt.currentState

    if (currentState.state !== "mature") {
        return false
    }

    return true
}

window.chopATree = async function (treeEnt) {
    while (true) {
        if (isTreeChoopable(treeEnt)) {
            chopTree(treeEnt)
        } else {
            break
        }

        await new Promise(r => setTimeout(r, 300));
    }
}

window.chopAllTrees = async function () {
    let trees = getAllPlayerTrees()

    for (let i = 0; i < trees.length; i++) {
        let tree = trees[i]

        await chopATree(tree)

        await new Promise(r => setTimeout(r, 500));
    }
}

window.getAllWoodDrops = function () {
    let woodDrops = []

    let entities = getMapEntitiesByClass("GenericEntityNode")

    // ent_wood

    entities.forEach(entity => {
        if (entity.gameEntity.id === "ent_wood") {
            woodDrops.push(entity)
        }
    })

    return woodDrops
}

window.collectWoodDrops = async function () {
    let woodDrops = getAllWoodDrops()

    for (let i = 0; i < woodDrops.length; i++) {
        let woodDrop = woodDrops[i]

        woodDrop.collided()

        await new Promise(r => setTimeout(r, 500));
    }


}

/**{
    "key": "ent_pickup_kongium",
    "mouse": {
        "x": 583,
        "y": 442
    },
    "world": {
        "x": 2612,
        "y": 3192
    },
    "object": {
        "x": 2607.5,
        "y": 3192,
        "width": 15,
        "height": 16
    },
    "selfPlayer": {
        "x": 2667.6162325244545,
        "y": 3212.981915613455
    },
    "leftClick": true,
    "rightClick": false,
    "clickable": true,
    "entityId": "ent_pickup_kongium",
    "type": "generic",
    "text": "",
    "useType": "entity",
    "entityType": "generic",
    "targetId": "65fbcff6533276ddc36c3e29"
} */

/**{
    "mid": "65fbcff5533276ddc36c3e16",
    "entity": "ent_pickup_kongium",
    "impact": "click",
    "inputs": [
        2590,
        3289
    ]
} */

window.collectAllItems = async function (entName) {
    let entities = getMapEntitiesByGameEntityId(entName)

    for (let i = 0; i < entities.length; i++) {
        let entity = entities[i]

        eventManager.ZP.sendEvent("clickEntity", {
            mid: entity.mid,
            impact: "click",
            inputs: [entity.x, entity.y],
            entity: entity.entity,
        })

        await new Promise(r => setTimeout(r, 500));
    }

}

/**{
    "mid": "661fad0e910838f6493d3bc0",
    "questId": "qst_RangerDale",
    "quest": "62f5a12eb62de2f5a37e1694",
    "player": "661fac92af8a278dffaa99f5",
    "isComplete": true,
    "createdAt": 1713351952403,
    "updatedAt": 1713352222746,
    "completedSteps": [
        {
            "step": 1,
            "completedAt": 1713352108658
        }
    ]
} */


window.talkToNpcForQuest = async function (npcName, questId) {
    while (true) {
        if (!isQuestDone(questId)) {
            await skipDialogUntilDisappear()

            await wait(2000)

            await talkToNpc(npcName)
            
            await wait(2000)

            await skipDialogUntilDisappear()

            console.log(`Done with ${questId} quest`)
            
            await wait(2000)
        } else {
            break
        }
    }
}

window.teleportToTerravillaAndWaitIfNotThere = async function () {
    let mapName = await getCurrentMapName()

    if (mapName !== "terravilla") {
        console.log("Warping to terravilla")

        await warpMap("terravilla")
    }
    
    while (mapName !== "terravilla") {
        await wait(500)
        mapName = await getCurrentMapName()
    }

    console.log("Waiting for terravilla to load")

    while (true) {
        try {
            const trees = getAllPlayerTrees()
            if (trees.length == 2) {
                break
            }
        } catch (e) {
            console.log(e)
        }

        await wait(500)
    }

    notify("Teleported to Terravilla!", 3000)
}

window.wait = async function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.getQuests = function () {
    let questsRaw = stateManager.playerSerializer.getState().quests["$items"]
    let questsList = []

    for (const [key, value] of questsRaw) { 
        questsList.push(value)
    }

    return questsList
}

window.getQuest = function (questId) {
    let quests = getQuests()
    let quest = null

    quests.forEach(q => {
        if (q.questId === questId) {
            quest = q
        }
    })

    return quest
}

window.isQuestDone = function (questId) {
    let quest = getQuest(questId)

    if (quest === null) {
        return false
    }

    return quest.isComplete
}

window.isQuestExists = function (questId) {
    let quest = getQuest(questId)

    if (quest === null) {
        return false
    }

    return true
}

window.getPlayerMid = function () {
    return stateManager.currentPlayer.core.mid
}

window.fetchMarketItem = async function (itemId) {
    let fetchings = await __webpack_require__(95047).Z.fetchMarketplaceListingsForItem(itemId,stateManager.currentPlayer.core.mid)
    return fetchings.listings
}

window.fetchMarketplaceListingsForPlayer = async function () {
    let fetchings = await __webpack_require__(95047).Z.fetchMarketplaceListingsForPlayer(stateManager.currentPlayer.core.mid)
    return fetchings.listings
}

window.getMails = async function () {
    eventManager.ZP.sendEvent(eventManager.Yi.FETCH_MAIL)
    await wait(2000)
    return stateStore.getState().mailbox.mail
}

window.claimMail = function (mailId) {
    eventManager.ZP.sendEvent(eventManager.Yi.COLLECT_MAIL_ITEM, {
        mailId: mailId,
        similar: true
    })
}

window. listItemsOnMarketplace = function (itemId, price, quantity) {
    eventManager.ZP.sendEvent(eventManager.fb.MARKETPLACE_SEND, {
        "subcommand": "create",
        "itemId": itemId,
        "quantity": quantity,
        "price": price,
        "currency": "cur_coins"
    })
}

window. teleportToGeneralStore = async function () {
    await teleportToTerravillaAndWaitIfNotThere()
    await wait(10000)
    await warpMap("generalStore")

    await wait(500)
}

window. buyListing = async function (itemId, quantity) {
    const [slot, amountInInventory] = getEquippedItemSlot(itemId)
    let amount = amountInInventory

    let listings = await fetchMarketItem(itemId)

    if (listings.length === 0) {
        console.log("No listings found")
        return
    }

    while (true) {
        
        let listing = listings[0]
        console.log(listing)

        eventManager.ZP.sendEvent(eventManager.fb.MARKETPLACE_SEND, {
            "subcommand": "purchase",
            "listingId": listing._id,
            "quantity": quantity
        })

        await wait(3000)

        let oldAmount = amount
        let [slott, amountInInventoryNew] = getEquippedItemSlot(itemId)

        amount = amountInInventoryNew

        if (amountInInventoryNew !== oldAmount) {
            notify(`Bought ${amount - oldAmount} ${itemId}`, 3000)
            break
        }

        await wait(500)
        notify("Trying to buy listing", 3000)
        listings = await fetchMarketItem(itemId)
    }
}

window.waitForAllListingsToBeSold = async function () {
    let listings = await fetchMarketplaceListingsForPlayer()

    while (listings.length > 0) {
        listings = await fetchMarketplaceListingsForPlayer()
        
        await wait(500)
    }

    notify("All listings sold!", 3000)

    // Claim all mails
    const mails = await getMails()

    /**{
    "_id": "6628b5e854279c6de5be1250",
    "player": "6627713554c3ca96747e8b54",
    "title": "Marketplace Sale Successful",
    "description": "CKLJSD5 purchased 1 itm_popberryFruit_name from you.",
    "descriptionTemplate": {
        "id": "marketplace.saleSuccess",
        "args": {
            "buyerName": "CKLJSD5",
            "itemName": "itm_popberryFruit_name",
            "quantity": 1,
            "currency": "cur_coins",
            "total": "69",
            "fee": "7"
        }
    },
    "kind": "coins",
    "collected": false,
    "currencyId": "cur_coins",
    "amount": 62,
    "__v": 0
} */

    for (let i = 0; i < mails.length; i++) {
        let mail = mails[i]

        if (mail.title === "Marketplace Sale Successful") {
            claimMail(mail._id)
            notify(`Claimed ${mail.amount} coins!`, 6000)
        }
    }
    
    notify("All mails claimed!", 3000)
}

/**[
    {
        "_id": "66278b5a8aaf005b914ca2b3",
        "itemId": "itm_popberryFruit",
        "ownerId": "65cf7fe0eec72343ab91ea96",
        "price": 58,
        "fee": 0.01,
        "feeCollected": 0,
        "currency": "cur_coins",
        "quantity": 20,
        "purchasedQuantity": 0,
        "claimedQuantity": 0,
        "state": "active",
        "createdAt": 1713867610161
    },
] */

window. getCurrentCoins = function () {
    return stateManager.currentPlayer.full.coinInventory["$items"].get(4).balance
}

window. getAveragePrice = function (listings) {
    let total = 0

    for (let i = 0; i < listings.length; i++) {
        total += listings[i].price
    }

    // To nearest integer
    return Math.round(total / listings.length)
}

window.getItemMarketplacePrice = async function (itemId) {
    let listings = await fetchMarketItem(itemId)
    return getAveragePrice(listings)
}



// window.newUser = true

{
    let startButton = document.querySelector('[class^="Intro_errorText__"]')
    
    if (startButton) {
        window.stateStore = getModule("StateStore").h
        window.stateManager = new getModule("GameStateManager").l.getInstance();
        window.gameManager = getModule("GameManager").Z

        if (!newUser) {

            stateStore.dispatch({
                "type": "game/setWorld",
                "payload": {
                    "worldId": 432,
                    "mapId": "terravilla"
                }
            })

            while (!stateManager.scene) {
                await new Promise(r => setTimeout(r, 500));
                // console.log("Waiting for stateManager.scene to be defined")
            }
    
            let mapName = await getCurrentMapName()
            
            while (mapName !== "terravilla") {
                await wait(500)
                mapName = await getCurrentMapName()
            }
    
            console.log("Waiting for terravilla to load")
    
            while (true) {
                try {
                    const trees = getAllPlayerTrees()
                    if (trees.length == 2) {
                        break
                    }
                } catch (e) {
                    console.log(e)
                }
    
                await wait(500)
            }
    
            notify("Teleported to Terravilla!", 6000)        

        } else {
            // barneysFarm
            stateStore.dispatch({
                "type": "game/setWorld",
                "payload": {
                    "worldId": 432,
                    "mapId": "barneysFarm"
                }
            })

            while (!stateManager.scene) {
                await new Promise(r => setTimeout(r, 500));
                // console.log("Waiting for stateManager.scene to be defined")
            }

            while (true) {
                try {
                    let cropEntities = getMapEntitiesByClass("SoilNode")
                    if (cropEntities.length > 0) {
                        break
                    }

                } catch (e) {
                    console.log(e)
                }

                await wait(500)
            }

            notify("Teleported to Barney's Farm!", 6000)
        }

        //
        
        // Wait until stateManager.scene is defined
        

        await wait(2000)
    }
}
// "6627713554c3ca96747e8b54"

// If stateManager is not defined, define it
if (!window.decodeHackery) {
    window.stateStore = getModule("StateStore").h
    window.stateManager = new getModule("GameStateManager").l.getInstance();
    window.eventManager = getModule("EventManager")
    window.sceneManagerClass = getModule("SceneManager").default
    window.handlerManager = getModule("HandlerManager").q
    window.gameManager = getModule("GameManager").Z
    window.playerInteractionManager = getModule("PlayerInteractionManager").m

    console.log("Hooked into the game")
    notify("Hooked into the game", 3000)

    

    window.decodeHackery = true
}
