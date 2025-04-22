import express from 'express'
import onboarduserController from '../../controller/onboarduser'
const router = express.Router()

// CREATE
router.post('/', onboarduserController.saveOnBoardUser)
router.post('/changestatus', onboarduserController.changeOnBoardUserStatus)

// GET
router.get('/', onboarduserController.getOnBoardUsers)

// DELETE
router.delete('/:userId', onboarduserController.deleteOnBoardUser)

export default router
