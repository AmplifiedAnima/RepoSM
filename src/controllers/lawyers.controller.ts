// import { Request, Response } from "express";
// import LawyerModel, { lawyerInterface } from "../models/lawyer.model";


// export const getAllLawyers = async (req: Request, res: Response) => {
//   try {
//     const allLawyers = await LawyerModel.find({});
//     console.log("All Lawyers:", allLawyers);
//     return res.status(201).json(allLawyers);
//   } catch (error) {
//     console.log(`error`, error);
//   }
// };

// export const getOneLawyer = async (req: Request, res: Response) => {
//   try {
//     const lawyerWithId = await LawyerModel.findById(req.params.id);
//     console.log(`id of lawyer `, lawyerWithId);
//     if (lawyerWithId) {
//       return res.status(201).json(lawyerWithId);
//     } else {
//       const error = new Error("the lawyer has not been found ");
//       res.status(404).json("lawyer not found ");
//       throw error;
//     }
//   } catch (error) {
//     return res.status(500).json({ message: "Error retrieving lawyer" });
//   }
// };

// export const createLawyer = async (req: Request, res: Response) => {
//   try {
//     console.log("Request Body:", req.body);
//     const newLawyer = new LawyerModel({
//       name: req.body.name,
//       location: req.body.location,
//       pomerania: req.body.pomerania,
//       contract: req.body.contract,
//     });
//     const { _id } = newLawyer;
//     const savedLawyer = await newLawyer.save();
//     res.status(201).json({ message: `lawyer With Id of ${_id}`, savedLawyer });
//   } catch (error) {
//     console.log(`error`, error);
//     res.status(500).send("internal server error, an issue occurred");
//   }
// };

// export const deleteLawyer = async (req: Request, res: Response) => {
//   try {
//     const lawyerWithId = await LawyerModel.findById(req.params.id);
//     console.log(`id with lawyer`, lawyerWithId);
//     if (!lawyerWithId) {
//       return res.status(404).json("Lawyer not found");
//     }
//     await LawyerModel.deleteOne({ _id: req.params.id });
//     return res
//       .status(200)
//       .json(`lawyer Of id ${req.params.id} has now been deleted`);
//   } catch (error) {
//     return res.status(500).json({ message: "Error deleting the lawyer" });
//   }
// };

// // controller to quickly create data of 100 lawyers for search functionality testing 
// export const createManyLawyers = async (req: Request, res: Response) => {
//   const lawyerData = [];

//   for (let i = 1; i <= 100; i++) {
//     lawyerData.push({
//       name: `Lawyer Name ${i}`,
//       location: `Location ${i}`,
//       pomerania: `Pomerania Info ${i}`,
//       description:`description of a profile it should look like it has some data inside ${i}`,
//       contract: `Contract Type ${i}`,
//     });
//   }

//   try {
//     const inserted = await LawyerModel.insertMany(lawyerData);
//     res
//       .status(201)
//       .json({ message: `${inserted.length} Lawyers created successfully` });
//   } catch (error) {
//     return res.status(500).json({ message: "Error creating lawyers" });
//   }
// };
