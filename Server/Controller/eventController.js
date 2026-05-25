import Event from "../Modles/Event.js";

export const getEvents = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.ticketPrice) {
      filter.ticketPrice = req.query.ticketPrice;
    }

    const events = await Event.find(filter);
    if (!events) {
      return res
        .status(200)
        .json({ success: true, message: "There is no event" });
    }
    res
      .status(200)
      .json({ success: true, message: "All events", data: events });
  } catch (error) {
    error.console.log(error.message);
  }
};

export const getEventByID = async (req, res) => {
  try {
    const id = req.params;
    const events = await Event.findById(id);
    if (!events) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found!" });
    }
    res
      .status(201)
      .json({ success: true, message: "item found using id", data: events });
  } catch (error) {
    error.console.log(error.message);
  }
};

export const createEvent = async (req, res) => {
  try {
    const {
      title,
      descreption,
      date,
      location,
      category,
      totalseats,
      availableseats,
      ticketPrice,
      imageUrl,
    } = req.body;
    if (
      !title ||
      !descreption ||
      !date ||
      !location ||
      !category ||
      !totalseats ||
      !availableseats ||
      !ticketPrice ||
      !imageUrl
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Missing Credentials" });
    }
    const newEvent = await Event.create({
      title,
      descreption,
      date,
      location,
      category,
      totalseats,
      availableseats,
      ticketPrice,
      imageUrl,
    });
    if (!newEvent) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Event not added,somthing went wrong!",
        });
    }
    res
      .status(201)
      .json({ success: true, message: "New Event Added", data: newEvent });
  } catch (error) {
    error.console.log(error.message);
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteByID = await Event.findByIdAndDelete(id);
    if (!deleteByID) {
      return res
        .status(201)
        .json({ success: false, message: "Id item not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Item has been deleted successfully" });
  } catch (error) {
    error.console.log(error.message);
  }
};

export const updateEvent = async (req, res) => {
    try {
        const {
            title,
            descreption,
            date,
            location,
            category,
            totalseats,
            availableseats,
            ticketPrice,
            imageUrl,
        } = req.body;
      
        const update = await Event.findByIdAndUpdate(req.params, {
            title,
            descreption,
            date,
            location,
            category,
            totalseats,
            availableseats,
            ticketPrice,
            imageUrl,
        },{new:true});
      if (!update) {
        return res.status(401).json({success:false,message:"Item Not Found!"})
      }
      res.status(200).json({success:true,message:"Item has been deleted"})
  } catch (error) {
    error.console.log(error.message);
  }
};
