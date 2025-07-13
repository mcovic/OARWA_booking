import { ReservationDto } from '@shared/DTO/reservation.dto';
import { NextFunction, Router, Request, Response } from 'express';
import Reservation from '../models/Reservation';

// ---------------------------------------------------------------

export class ReservationController {
    public readonly reservationRouter;

    constructor() {
        this.reservationRouter = Router();

        this.reservationRouter.get('/', this.getReservations.bind(this));
        this.reservationRouter.get('/dates', this.getReservationDates.bind(this));
        this.reservationRouter.get('/me', this.getMyReservations.bind(this));
        this.reservationRouter.post('/', this.createReservation.bind(this));
    }

    private async getReservations(_: Request, res: Response, next: NextFunction) {
        try {
            const reservations = await Reservation.find();
            res.status(200).json(reservations);
        } catch (error) {
            next(error);
        }
    }

    private async getReservationDates(_: Request, res: Response, next: NextFunction) {
        try {
            const dates = await Reservation.find({}, { date: 1, _id: 0 }); // only return the 'date' field
            res.status(200).json(dates);
        } catch (error) {
            next(error);
        }
    }

    private async getMyReservations(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id;

            if (!userId) {
                return res.status(401).json({ message: 'Niste prijavljeni' });
            }

            const reservations = await Reservation.find({ user_id: userId });

            res.status(200).json(reservations);
        } catch (error) {
            next(error);
        }
    }

    private async createReservation(req: Request, res: Response, next: NextFunction) {
        try {
            const reservationData: ReservationDto = req.body;

            const reservation = new Reservation(reservationData);
            await reservation.save();

            res.status(201).json({ message: 'Rezervacija uspješno kreirana', reservation });
        } catch (error) {
            next(error);
        }
    }
}