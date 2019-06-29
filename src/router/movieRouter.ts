import { Express, Request, Response, NextFunction } from "express";
import * as movieController from "../controller/movieController";

export default function(app: Express) {
    
    app.route("/movies").get(async function(req: Request, res: Response, next: NextFunction) {
        
        try {
            res.json(await movieController.list(req.query.pageIndex, req.query.pageSize));        
        } catch (err) {
            next(err);
        }

    });

    app.route("/movies").post(async function(req: Request, res: Response, next: NextFunction) {
        
        try {
            res.json(await movieController.create(req.body));
        } catch (err) {
            next(err);
        }

    });

    app.route("/movies/:id").get(async function(req: Request, res: Response, next: NextFunction) {
        
        try {
            res.json(await movieController.read(req.params.id));
        } catch (err) {
            next(err);
        }

    });

    app.route("/movies/:id").put(async function(req: Request, res: Response, next: NextFunction) {

        try {
            res.json(await movieController.update(req.params.id, req.body));
        } catch (err) {
            next(err);
        }

    });

    app.route("/movies/:id").delete(async function(req: Request, res: Response, next: NextFunction) {

        try {
            res.json(await movieController._delete(req.params.id));
        } catch (err) {
            next(err);
        }

    });

    app.route("/movies/findOneByTitle/:movieTitle").get(async function(req: Request, res: Response, next: NextFunction) {

        try {
            res.json(await movieController.findOneByTitle(req.params.movieTitle));
        } catch (err) {
            next(err);
        }


    });

    app.route("/movies/findAllByActorName/:actorName").get(async function(req: Request, res: Response, next: NextFunction) {

        try {
            res.json(await movieController.findAllByActorName(req.params.actorName, req.query.pageIndex, req.query.pageSize));
        } catch (err) {
            next(err);
        }

    });

}