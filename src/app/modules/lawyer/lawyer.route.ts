import  express  from "express"
import { LawyerController } from "./lawyer.controller";
import validateRequest from "../../utils/ValidateRequenst";
import { LawyerValidation } from "./lawyer.validation";
import auth from "../../midlleWear/auth";
import USER_ROLE from "../../constants/userRole";
import { upload } from "../../utils/sendFileToCloudinary";


const router = express.Router()

router.post(
  "/upload-image",
  auth(USER_ROLE.lawyer),
  upload.single("file"),
  LawyerController.uploadLawyerImage

)

router.get('/',LawyerController.getAllLawyers)  //,auth(USER_ROLE.admin)
router.get('/:id',LawyerController.getSingleLawyers)  //auth(USER_ROLE.admin)



// Add profile (basic info) 

router.post(
  "/basic",
  validateRequest(LawyerValidation.updateBasicProfileSchhema), //auth(USER_ROLE.lawyer,USER_ROLE.admin),
  LawyerController.addLawyerProfile
);

router.post(
  "/license",
  auth(USER_ROLE.lawyer),
  validateRequest(LawyerValidation.licenseSchema),
  LawyerController.addLawyerLicense
)

router.post(
  "/document",
  auth(USER_ROLE.lawyer),
  upload.array("files"),
  LawyerController.addLawyerDocument
)

router.delete(
  "/delete-document",
  auth(USER_ROLE.lawyer),
  validateRequest(LawyerValidation.deleteDocumentSchema),
  LawyerController.deleteLawyerDocument
)

router.post(
  "/education",
  auth(USER_ROLE.lawyer),
  validateRequest(LawyerValidation.educationSchema),
  LawyerController.addLawyerEducation
)

router.delete(
  "/delete-education",
  auth(USER_ROLE.lawyer),
  validateRequest(LawyerValidation.deleteEducationschema),
  LawyerController.deleteLawyerEducation
)


router.post(
  "/experience",
  auth(USER_ROLE.lawyer),
  validateRequest(LawyerValidation.experienceSchema),
  LawyerController.addLawyerExperience
)

router.delete(
  "/delete-experience",
  auth(USER_ROLE.lawyer),
  validateRequest(LawyerValidation.deleteExperienceSchema),
  LawyerController.deleteLawyerExperience
)

router.patch(
  "/status",
  auth(USER_ROLE.admin),
  validateRequest(LawyerValidation.statusSchema),
  LawyerController.updateLawyerStatus
)





// Soft delete laywer (mark as deleted)
router.delete(
  "/delete",
  auth(USER_ROLE.admin),
   LawyerController.deleteLawyer
  
)




export const LawyerRoutes = router;