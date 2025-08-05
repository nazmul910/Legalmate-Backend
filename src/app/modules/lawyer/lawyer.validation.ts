import { title } from "process";
import { z } from "zod";

const updateBasicProfileSchhema = z.object({
  body: z.object({
    name:z.string().optional(),
    about: z.string().optional(),
    contactNumber: z.string().optional(),
    location: z.string().optional(),
    workArea: z.string().optional(),
    specializations: z.array(z.string()).optional(),
    practiceAreas: z.array(z.string()).optional(),
    consultationFee: z.string().optional(),
    consultationTime:z.string().optional(),
    availability: z.object({
      days: z.array(z.string()).optional(),
      timeSlot:z.array(z.string()).optional(),
    }).optional()
  })
});

const licenseSchema = z.object({
  body:z.object({
    state:z.string(),
    licenseNumber:z.string().optional(),
    acquiredDate: z.string(),
    expiryDate: z.string().optional(),
    status: z.enum(["active","inactive","suspended","revoke"])
  })
})

const deleteDocumentSchema = z.object({
  body:z.object({
    document: z.string(),
  })
});

const educationSchema = z.object({
  body: z.object({
    degree: z.string(),
    fieldOfStydy: z.string().optional(),
    institution: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    honors: z.string().optional(),
    description: z.string().optional(),
  })
});

const deleteEducationschema = z.object({
  body:z.object({
    degree: z.string(),
    institution: z.string(),
  })
});

const experienceSchema = z.object({
  body:z.object({
    title: z.string(),
    company: z.string(),
    location: z.string().optional(),
    description: z.string().optional(),
    startDate: z.string(),
    endDate: z.string().optional(),
    isCurrent: z.string().optional(),
  })
})

const deleteExperienceSchema = z.object({
  body:z.object({
    title:z.string(),
    company:z.string()
  })
})

const statusSchema = z.object({
  body: z.object({
    status: z.enum(["approved","pending","rejected"])
  })
})


export const LawyerValidation ={
  updateBasicProfileSchhema,
  licenseSchema,
  deleteDocumentSchema,
  educationSchema,
  deleteEducationschema,
  experienceSchema,
  deleteExperienceSchema,
  statusSchema
  
}

