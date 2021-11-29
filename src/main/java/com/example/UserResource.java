package com.example;

import javax.annotation.security.PermitAll;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/user")
public class UserResource {
    @GET
    @PermitAll
    @Produces(MediaType.APPLICATION_JSON)
    public Response sendResponse() {
        return Response.ok("Everyone can see it bro!").build();
    }
}
