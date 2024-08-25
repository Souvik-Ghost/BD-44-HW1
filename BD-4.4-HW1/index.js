let express = require("express");
let app = express();
let port = process.env.port || 3000;
let db;
let sqlite3 = require("sqlite3");
let { open } = require("sqlite");
// Connect to SQLite database
(async () => {
  db = await open({
    filename: "./BD-4.4-HW1/database.sqlite",
    driver: sqlite3.Database,
  });
  if (db) console.log("Connected to the SQLite database.");
})();

//Message
app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.4 HW1 Select specific columns" });
});

//node BD-4.4-HW1/initDB.js
// THE ENPOINTS
//node BD-4.4-HW1
//1 /courses
async function fetchAllCourses() {
  let response = await db.all("SELECT * FROM courses");
  return { courses: response };
}
app.get("/courses", async (req, res) => {
  try {
    const result = await fetchAllCourses();
    if (result.courses.length === 0)
      return res.status(404).json({ message: "No courses found" });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
//2 /courses/instructor/John%20Doe
async function fetchCoursesByInstructor(instructor) {
  let response = await db.all("SELECT * FROM courses WHERE instructor = ?", [
    instructor,
  ]);
  return { courses: response };
}
app.get("/courses/instructor/:instructor", async (req, res) => {
  let instructor = req.params.instructor;
  try {
    const result = await fetchCoursesByInstructor(instructor);
    if (result.courses.length === 0)
      return res.status(404).json({ message: "No courses found" });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
//3 /courses/category/Database
async function fetchCoursesByCategory(category) {
  let response = await db.all("SELECT * FROM courses WHERE category = ?", [
    category,
  ]);
  return { courses: response };
}
app.get("/courses/category/:category", async (req, res) => {
  let category = req.params.category;
  try {
    const result = await fetchCoursesByCategory(category);
    if (result.courses.length === 0)
      return res.status(404).json({ message: "No courses found" });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
