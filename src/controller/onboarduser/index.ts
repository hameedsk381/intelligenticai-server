import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { OnBoardUser } from '../../database/entities/OnBoardUser'
import { InternalError } from '../../error/InternalError'
import onboarduserService from '../../service/onboarduser'
import userService from '../../service/user'
const getOnBoardUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const apiResponse = await onboarduserService.getOnBoardUsers()
        res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

const saveOnBoardUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.body) {
            throw new InternalError(StatusCodes.PRECONDITION_FAILED, `Error: onboardUserRouter.saveOnboardUser - body not provided!`)
        }
        const body = req.body
        let onboardUser = new OnBoardUser()
        Object.assign(onboardUser, body)
        const apiResponse = await onboarduserService.saveOnBoardUser(onboardUser)
        res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}
const changeOnBoardUserStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.body) {
            throw new InternalError(StatusCodes.PRECONDITION_FAILED, `Error: onboardUserRouter.chageOnboardUserStatus - body not provided!`)
        }
        const body = req.body
        const apiResponse = await onboarduserService.changeOnBoardUserStatus({
            userId: body.userId,
            status: body.status
        })
        // If status is approved, create a new user
        if (body.status === 'approved') {
            const user = await userService.getUserById(body.userId)
            const newUser = {
                usecase: user.usecase || null,
                companysize: user.companysize || null,
                industry: user.industry || null,
                companyname: user.companyname || null,
                name: user.name || null,
                email: user.email || null,
                designation: user.designation || null,
                phone: user.phone || null,
                requirements: user.requirements || null,
                dataprivacy: user.dataprivacy || null,
                marketingconsent: user.marketingconsent || null,
                username: user.username || null,
                password: user.password || null,
                apikey: user.apikey || null,
                flowids: user.flowids || null,
                agentids: user.agentids || null
            };
            const createdUser = await userService.createUser(newUser);
            res.json(createdUser);
        }
    } catch (error) {
        next(error)
    }
}

const deleteOnBoardUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.userId
        if (!userId) {
            throw new InternalError(StatusCodes.PRECONDITION_FAILED, `Error: onboardUserRouter.deleteOnBoardUser - userId not provided!`)
        }
        const apiResponse = await onboarduserService.deleteOnBoardUser(userId)
        res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

export default {
    getOnBoardUsers,
    saveOnBoardUser,
    changeOnBoardUserStatus,
    deleteOnBoardUser
}
