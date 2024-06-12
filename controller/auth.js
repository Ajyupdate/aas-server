const {v4: uuidv4} = require("uuid")
const Student = require("../models/Students");

router.post('/register', async (req, res) => {
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
      faculty,
      department,
      school,
      matric_no,
    } = req.body;
  
    if (
      
      !first_name ||
      !last_name ||
      !date_of_birth ||
      !gender ||
      !email ||
      !address ||
      !phone_number ||
      !username ||
      !profile_picture_url||
      !password ||
      !faculty ||
      !department ||
      !school ||
      !matric_no
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const student_id = uuidv4()
    try {
      const user = await Student.create({
        student_id,
        first_name,
        last_name,
        date_of_birth,
        gender,
        email,
        address,
        phone_number,
        username,
        password: hashedPassword,
        profile_picture_url,
        faculty,
        department,
        school,
        matric_no,
      });
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ message: 'User registration failed', error: err.message });
    }
  });