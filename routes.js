import { Router } from 'express'

const router = Router()

// Importing image-related functions from imageController
import { createImage, editImage, createVariation } from './imageController.js'

// Defining route for creating an image
router.post('/create-image', createImage)
// Defining route for editing an image
router.post('/edit-image', editImage)
// Defining route for creating a variation of an image
router.post('/create-variation', createVariation)

// Exporting the router to be used in other files
export default router

