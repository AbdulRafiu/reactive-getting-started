package com.example;


import io.quarkus.hibernate.reactive.panache.Panache;
import io.quarkus.panache.common.Sort;
import io.smallrye.mutiny.Uni;
import org.jboss.resteasy.reactive.RestPath;

import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

import static javax.ws.rs.core.Response.Status.*;

@Path("cars")
@ApplicationScoped
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CarResource {

    @GET
    public Uni<List<Car>> getAllCars() {
        return Car.listAll(Sort.by("name"));
    }

    @Path("/{id}")
    @GET
    public Uni<Car> getCar(@PathParam("id") Long id) {
        return Car.findById(id);
    }

    @POST
    public Uni<Response> create(Car car) {
        if (car == null || car.getId() != null) {
            throw new WebApplicationException("Id was invalidly set on request.", 422);
        }

        return Panache.withTransaction(car::persist)
                .replaceWith(Response.ok(car).status(CREATED)::build);
    }

    @PUT
    @Path("/{id}")
    public Uni<Response> update(@PathParam("id") Long id, Car updatedCar) {
        if (updatedCar == null)
            throw new WebApplicationException("Details were not updated on request", 422);
        return Panache.withTransaction( () -> Car.<Car>findById(id).
                        onItem().
                        ifNotNull().
                        invoke(
                            (car) -> {
                                car.setName(updatedCar.getName());
                                car.setVariant(updatedCar.getVariant());
                                car.setMake(updatedCar.getMake());
                                car.setModel(updatedCar.getModel());
                                car.setAutomatic(updatedCar.getAutomatic());
                            }
                            )
                )
                .onItem().ifNotNull().
                transform(car -> Response.ok(car).build())
                .onItem().ifNull()
                .continueWith(Response.ok().status(NOT_FOUND)::build);

    }

    @DELETE
    @Path("/{id}")
    public Uni<Response> delete(@PathParam("id") Long id) {
        return Panache.withTransaction( () -> Car.deleteById(id) )
                .map( deleted -> deleted ? Response.ok().status(NO_CONTENT).build() :
                        Response.ok().status(NOT_FOUND).build());
    }

}
