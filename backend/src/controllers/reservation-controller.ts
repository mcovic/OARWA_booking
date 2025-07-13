import { ReservationDto } from '@shared/DTO/reservation.dto';
import { RoleEnum } from '@shared/enums/RoleEnum';
import { NextFunction, Router, Request, Response } from 'express';
import Reservation from '../models/Reservation';
import { adminMiddleware } from '@middleware/admin-middleware';

// ---------------------------------------------------------------

export class ReservationController {
    public readonly reservationRouter;

    constructor() {
        this.reservationRouter = Router();

        this.reservationRouter.get('/', adminMiddleware, this.getReservations.bind(this));
        this.reservationRouter.get('/dates', this.getReservationDates.bind(this));
        this.reservationRouter.get('/me', this.getMyReservations.bind(this));
        this.reservationRouter.post('/', this.createReservation.bind(this));
        this.reservationRouter.delete('/:id', this.deleteReservation.bind(this));
    }

    private async getReservations(_: Request, res: Response, next: NextFunction) {
        try {
            const reservations = await Reservation.find().populate('user_id');
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
            const userId = req.user?.id;
            const reservationData: ReservationDto = req.body;

            const reservation = new Reservation({
                user_id: userId,
                date: reservationData.date,
            });
            await reservation.save();

            res.status(201).json({ message: 'Rezervacija uspješno kreirana', reservation });
        } catch (error) {
            next(error);
        }
    }

    private async deleteReservation(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id;
            const isAdmin = req.user?.role_id === RoleEnum.ADMIN;
            const reservationId = req.params.id;

            const reservation = await Reservation.findById(reservationId);

            if (!reservation) {
                return res.status(404).json({ message: 'Rezervacija nije pronađena' });
            }

            // If not admin, check if user owns the reservation
            if (!isAdmin && reservation.user_id.toString() !== userId) {
                return res.status(403).json({ message: 'Nemate dozvolu za brisanje ove rezervacije' });
            }

            await Reservation.findByIdAndDelete(reservationId);

            res.status(204);
        } catch (error) {
            next(error);
        }
    }
}