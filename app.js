import express, { json } from "express";
import cors from "cors";
import { nanoid } from "nanoid";
import { Low, JSONFile } from "lowdb";

//initialize the express app
const app = express();
app.use(cors());
app.use(json());

//crete db connection
const adapter = new JSONFile("db.json");
const db = new Low(adapter);

//get all quizes
app.get("/quizes", async (req, res) => {
  await db.read();
  const quizes = db.data.quizes || { message: "no data found" };
  res.json(quizes);
});

//get single quiz
app.get("/quizes/:id", async (req, res) => {
  await db.read();
  const quizes = db.data.quizes;
  const quiz = quizes.find((quiz) => quiz.id === req.params.id);
  res.json(quiz);
});

//post new quiz
app.post("/quizes", async (req, res, next) => {
  try {
    await db.read();
    const quizes = db.data.quizes;
    console.log(req.body);
    const { question, answer, options } = req.body;
    //crete a new quiz
    let newQuiz = {
      id: nanoid(6),
      question,
      answer,
      options,
    };

    quizes.push(newQuiz);
    await db.write();
    //return newQuiz;
    res.json(newQuiz);
  } catch (error) {
    next(error);
  }
});

//update a quiz
app.put("/quizes/:id", async (req, res, next) => {
  try {
    const body = req.body;
    await db.read();
    const quizes = db.data.quizes;
    //find the quiz
    const index = quizes.findIndex((quiz) => quiz.id === req.params.id);
    if (index < 0) {
      res.status(404).json({ message: "Quiz not found" });
    } else {
      let quiz = quizes[index];

      let updatedQuiz = {
        ...quiz,
        ...body,
      };

      quizes.splice(index, 1, updatedQuiz);
      await db.write();

      res.json(updatedQuiz);
    }
  } catch (error) {
    res.status(500).json({
      message: "error updating quiz",
    });
  }
});

//delete a quiz
app.delete("/quizes/:id", async (req, res, next) => {
  try {
    await db.read();
    const quizes = db.data.quizes;
    //find the quiz
    const index = quizes.findIndex((quiz) => quiz.id === req.params.id);
    if (index < 0) {
      res.status(404).json({ message: "Quiz not found" });
    } else {
      //delete the quiz
      quizes.splice(index, 1);
      //update db
      await db.write();
      res.json({
        message: "Quiz deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "error deleting quiz",
    });
  }
});

//declare the port
const PORT = process.env.PORT || 4000;
//server listening on PORT
app.listen(PORT, () => {
  console.log("listening on port 4000");
});
