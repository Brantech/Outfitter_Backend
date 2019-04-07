var WardrobeItem = require('../models/WardrobeItem.model');

exports.getWardrobe = async function (ownerId) {
    try {
        return await Wardrobe.find({owner_id: ownerId});
    } catch (e) {
        throw Error('Error while fetching wardrobe by ownerId');
    }
}

exports.getWardrobes = async function (query, limit) {
    var options = {limit};
    try {
        return await WardrobeItem.find(query, options);
    } catch (e) {
        throw Error('Error while fetching wardrobe items');
    }
}

exports.deleteWardrobe = async function (ownerId) {
    try {
        var deleted = await User.deleteMany({owner_id: ownerId});
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error('Error could not delete wardrobe items');
        }
        return deleted;
    } catch (e) {
        throw Error('Error while fetching wardrobe by ownerId');
    }
}

exports.getWardrobeItem = async function (ownerId, garmentId) {
    try {
        var wardrobeItem = await Wardrobe.findOne({owner_id: ownerId, garment_id: garmentId});
        return wardrobeItem.tags;
    } catch (e) {
        throw Error('Error while fetching wardrobe item');
    }
}

exports.updateWardrobeItem = async function (wardrobeItem) {
    var ownerId = wardrobeItem.ownerId;
    var garmentId = wardrobeItem.garmentId;
    try {
        var oldWardrobeItem = await User.findOne({owner_id: ownerId, garment_id: garmentId});
        if (!oldWardrobeItem) {
            return false;
        }
    } catch (e) {
        throw Error('Error occurred while updating the wardrobe item');
    }

    oldWardrobeItem.tags = wardrobeItem.tags;

    try {
        return await oldWardrobeItem.save();
    } catch (e) {
        throw Error('Error occurred while saving the updated wardrobe item');
    }
}

exports.deleteWardrobeItem = async function (ownerId, garmentId) {
    try {
        var deleted = await User.delete({owner_id: ownerId, garment_id: garmentId});
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error('Error could not delete wardrobe item');
        }
        return deleted;
    } catch (e) {
        throw Error('Error while deleting wardrobe item');
    }
}