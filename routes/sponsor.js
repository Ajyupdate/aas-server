const { Router } = require("express");
const Sponsors = require("../models/Sponsor")
const router = Router();
const {v4: uuidv4} = require("uuid")

router.get("", async(req, res) => {
    try{
        const sponsorss = await Sponsors.findAll();
        res.json(sponsorss)
    }
    catch(error){
        console.error('Error getting sponsors', error)
    }
})


router.post('/add', async (req, res) => {
    try {
      const {
        first_name,
        last_name,
        date_of_birth,
        gender,
        email,
        address,
        phone_number,
        username,
        password,
        profile_picture_url,
        alumni,
        role,
      } = req.body;
      const sponsor_id = uuidv4();
      const newSponsor = await Sponsors.create({
        sponsor_id,
        first_name,
        last_name,
        date_of_birth,
        gender,
        email,
        address,
        phone_number,
        username,
        password,
        profile_picture_url,
        alumni,
        role,
      });
  
      res.status(201).json({message: "Sponsor created successfully",
                            sponsor: newSponsor});
    } catch (error) {
      console.error('Error creating sponsor:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  // DELETE route to delete a sponsor by ID
  router.delete('/:id', async (req, res) => {
    try {
      const sponsorId = req.params.id;
  
      // Check if the sponsor with the given ID exists
      const existingSponsor = await Sponsors.findByPk(sponsorId);
  
      if (!existingSponsor) {
        return res.status(404).json({ error: 'Sponsor not found' });
      }
  
      // Delete the sponsor
      await existingSponsor.destroy();
  
      res.status(200).json({ message: 'Sponsor deleted successfully' });
    } catch (error) {
      console.error('Error deleting sponsor:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  router.patch('/:id', async (req, res) => {
    try {
      const sponsorId = req.params.id;
      console.log(sponsorId)
      // Check if the sponsor with the given ID exists
      const existingSponsor = await Sponsors.findByPk(sponsorId);
     
      if (!existingSponsor) {
        return res.status(404).json({ error: 'Sponsor not found' });
      }
  
      // Update the sponsor with the new data from the request body
      await existingSponsor.update(req.body);
  
      res.status(200).json({ message: 'Sponsor updated successfully', updatedSponsor: existingSponsor });
    } catch (error) {
      console.error('Error updating sponsor:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
module.exports = router