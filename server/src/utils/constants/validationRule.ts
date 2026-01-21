import mongoose,{ObjectId} from "mongoose";
import {email, z} from "zod"

const getMinLengthMessage = (field: string, val: number) => {
  return `${field} must be at least ${val} characters long`;
};

const getMaxLengthMessage = (field: string, val: number) => {
  return `${field} must be ${val} characters or less`;
};

const getValidObjectIdMessage = (field: string) =>
  `${field} must be a valid MongoDB ObjectId (24 hex characters)`;

const getValidEmailMessage = (field: string) => `${field} must be a valid email`;


const getValidUrlMessage = (field: string) => {
  return `${field} must be a valid URL`;
};

const getAtLeastMessage = (field: string, val: number, type: string) => {
  return `${field} must contain at least ${val} ${type}`;
};

const getMinValueMessage = (field: string, val: number) => {
  return `${field} must be at least ${val}`;
};

const getMaxValueMessage = (field: string, val: number) => {
  return `${field} must be ${val} or less`;
};


export const companyValidationRule = {
    Email: z.string().email("Invalid email"),
    Password: z
    .string()
    .min(8, getMinLengthMessage("Password", 8))
    .max(100, getMaxLengthMessage("Password", 100))
    .regex(/[a-z]/, {
      message: getAtLeastMessage("Password", 1, "lowercase letter"),
    })
    .regex(/[A-Z]/, getAtLeastMessage("Password", 1, "uppercase letter"))
    .regex(/\d/, getAtLeastMessage("Password", 1, "number"))
    .regex(/[\W_]/, getAtLeastMessage("Password", 1, "special character")),
    name: z
    .string()
    .min(3, getMinLengthMessage("Company name", 3))
    .max(30, getMaxLengthMessage("Company name", 30))
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores",
    })
}

export const employeeValidationRule = {
  Name: z
    .string()
    .min(3, getMinLengthMessage("Company name", 3))
    .max(30, getMaxLengthMessage("Company name", 30))
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores",
    }), 

      Email: z.string().email("Invalid email"),


  Position: z
    .string()
    .min(3, getMinLengthMessage("Position", 3))
    .max(50, getMaxLengthMessage("Position", 50)),

  Address: z
    .string()
    .min(3, getMinLengthMessage("Address", 3))
    .max(300, getMaxLengthMessage("Address", 300))
    ,

  Role: z.enum(["admin", "user"]),

  CompanyId: z
    .string()
    .refine((val) => /^[a-fA-F0-9]{24}$/.test(val), {
      message: getValidObjectIdMessage("companyId"),
    }),

  Status: z
    .enum(["pending", "requested", "approved", "rejected"])
    ,

  active: z.boolean(),
};