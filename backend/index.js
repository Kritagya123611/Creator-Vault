import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://zxkwxiztexidhzcxexbc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4a3d4aXp0ZXhpZGh6Y3hleGJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMDc4MDUsImV4cCI6MjA2NDc4MzgwNX0.Y4BJRjjW0LZGhuHyAcu6d_-AyQWqHoo1L1uvvdvly-Q';
export const supabase = createClient(supabaseUrl, supabaseKey);
import express from 'express';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json({ limit: '10mb' })); // or 10mb as needed


app.get('/', (req, res) => {
  res.send('Hello from Express backend!');
});

app.post("/signin",async(req,res)=>{
  const {name,role,email,password}=req.body;
  if(!name || !role || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const {data,error}=await supabase
    .from('User')
    .insert([{
      name,
      role,
      email,
      password
    }])
    .select();
    if(error){
      return res.status(500).json({ error: 'Error inserting data' });
    }
    return res.status(201).json({ message: 'User registered successfully', user: data });
})

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const { data, error } = await supabase
    .from('User')
    .select('*')
    .eq('email', email)
    .eq('password', password)
    .limit(1);

  if (error) {
    console.error("Supabase error:", error);
    return res.status(500).json({ error: 'Error fetching data' });
  }

  if (data.length === 0) {
    return res.status(401).json({ error: 'No such account found please signUp ' });
  } else {
    return res.status(200).json({ message: 'Login successful', user: data[0] });
  }
});

app.post("/store", async (req, res) => {
  const {
    name: store_name,
    profilePicture: profile_picture,
    subdomain,
    bio
  } = req.body;

  const { data, error } = await supabase
    .from('store')
    .insert([{
      store_name,         
      profile_picture,
      subdomain,
      bio
    }])
    .select();

  if (error) {
    console.error("Supabase Insert Error:", error);
    return res.status(500).json({ error: error.message || 'Error inserting data' });
  } else {
    return res.status(201).json({ message: 'Store created successfully', store: data });
  }
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
