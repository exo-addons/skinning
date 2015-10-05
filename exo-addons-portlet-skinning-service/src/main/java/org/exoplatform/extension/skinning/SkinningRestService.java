package org.exoplatform.extension.skinning;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.core.Response;
import org.exoplatform.services.rest.resource.ResourceContainer;
import org.exoplatform.social.core.identity.model.Identity;
import org.exoplatform.social.service.rest.RestChecker;
import org.exoplatform.social.service.rest.Util;
import org.exoplatform.social.core.manager.IdentityManager;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import org.exoplatform.services.log.ExoLogger;
import org.exoplatform.services.log.Log;
import org.json.JSONObject;


@Path("/skinning")
@Produces("application/json")
public class SkinningRestService implements ResourceContainer {

    private static final Log LOG = ExoLogger.getLogger(SkinningRestService.class);
    final  String SKIN_FOLDER = new File( System.getProperty( "catalina.base" ) ).getAbsoluteFile()+"/webapps/skin";
    final  String FILE_NAME = SKIN_FOLDER+"/skinning.css";
    final Charset ENCODING = StandardCharsets.UTF_8;
    private static final String portalContainerName = "portal";
    private static final String[] SUPPORTED_FORMATS = new String[]{"json"};


    private IdentityManager identityManager_;

 @POST
    @Path("write")
    @Consumes({MediaType.APPLICATION_JSON})
    public Response write(@Context HttpServletRequest request,@Context UriInfo uriInfo,
                          List<String> lines) throws Exception {

        Identity sourceIdentity = Util.getAuthenticatedUserIdentity(portalContainerName);
        MediaType mediaType = RestChecker.checkSupportedFormat("json", SUPPORTED_FORMATS);
        try {

            if(sourceIdentity == null) {
                return Response.status(Response.Status.UNAUTHORIZED).build();
            }
            LOG.info(FILE_NAME);

            writeSmallTextFile(lines, FILE_NAME, ENCODING);

            LOG.info("file has been Updated successfully");
            JSONObject jsonGlobal = new JSONObject();
            jsonGlobal.put("message","file Updated");
            return Response.ok(jsonGlobal.toString(), mediaType).build();
        } catch (Exception e) {
            LOG.error(e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("An internal error has occured").build();
        }
    }
    void writeSmallTextFile(List<String> aLines, String aFileName, Charset encoding) throws IOException {
        java.nio.file.Path path = Paths.get(aFileName);
        try {
            Files.write(path, aLines, encoding);
        } catch (IOException e) {
             (new File(SKIN_FOLDER)).mkdirs();
            Files.write(path, aLines, encoding);
        }
    }

    List<String> readSmallTextFile(String aFileName, Charset encoding) throws IOException {
        java.nio.file.Path path = Paths.get(aFileName);
        return Files.readAllLines(path, encoding);
    }
}

