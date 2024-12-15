const Chat = require("../../model/chat/chat.schema");
const Message = require("../../model/chat/message.schema");



const getRiderAllChats = async (req, res) => {
    try {
        let chats = await Chat.find({ riderId: req.params.id }).populate("driverId").populate("riderId");
        if (!chats || chats.length === 0) {
            return res.status(200).json({ msg: null, status: 200, data: [] });
        }
        const updatedChats = await Promise.all(chats.map(async (chat) => {
            let latestMessage = await Message.findOne({ chatId: chat._id }).sort({ createdAt: -1 });    
            return {...chat._doc,latestMessage: latestMessage || null,};
        }));
        return res.status(200).json({ msg: null, status: 200, data: updatedChats });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'An error occurred', status: 500 });
    }
};
const getDriverAllChats = async (req, res) => {
    try {
        let chats = await Chat.find({ driverId: req.params.id }).populate("driverId").populate("riderId");
        if (!chats || chats.length === 0) {
            return res.status(200).json({ msg: null, status: 200, data: [] });
        }
        const updatedChats = await Promise.all(chats.map(async (chat) => {
            let latestMessage = await Message.findOne({ chatId: chat._id }).sort({ createdAt: -1 });
            return {...chat._doc,latestMessage: latestMessage || null,};
        }));
        return res.status(200).json({ msg: null, status: 200, data: updatedChats });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'An error occurred', status: 500 });
    }
};


const createChat = async (req, res) => {
    try {
        let { physicianId, ctemsId } = req.body
        let data = await Chat.findOne({ physicianId: physicianId, ctemsId: ctemsId })
        if (data?._id) {
            return res.status(200).json({ msg: null, status: 200, data: data })
        }
        else {
            let data = await Chat.create({ physicianId: physicianId, ctemsId: ctemsId })
            return res.status(200).json({ msg: "Chat Created", status: 200, data: data })
        }
    }
    catch (error) {
        console.log(error)
    }
}

const getSingleChat = async (req, res) => {
    try {
        let data = await Chat.findById(req.params.id).populate("driverId").populate("riderId");
        return res.status(200).json({ msg: null, status: 200, data: data })
    }
    catch (error) {
        console.log(error)
    }
}



module.exports = {getRiderAllChats,getDriverAllChats,getSingleChat,createChat}