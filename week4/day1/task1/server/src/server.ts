import app from './app';
import connectDB from './config/db';

const PORT = process.env.PORT || 5000;

// Start server
// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// });

 app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });