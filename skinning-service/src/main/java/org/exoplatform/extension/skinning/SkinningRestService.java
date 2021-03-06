package org.exoplatform.extension.skinning;

import javax.jcr.Node;
import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.core.Response;

import org.exoplatform.container.PortalContainer;
import org.exoplatform.services.jcr.RepositoryService;
import org.exoplatform.services.jcr.core.ManageableRepository;
import org.exoplatform.services.rest.resource.ResourceContainer;
import org.exoplatform.social.core.identity.model.Identity;
import org.exoplatform.social.service.rest.RestChecker;
import org.exoplatform.social.service.rest.Util;
import org.exoplatform.social.core.manager.IdentityManager;
import javax.servlet.http.HttpServletRequest;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.lang.String;
import java.nio.charset.Charset;

import java.util.GregorianCalendar;
import java.util.List;

import org.exoplatform.services.log.ExoLogger;
import org.exoplatform.services.log.Log;
import org.json.JSONObject;


@Path("/skinning")
@Produces("application/json")
public class SkinningRestService implements ResourceContainer {

    private static final Log LOG = ExoLogger.getLogger(SkinningRestService.class);
    private static final String portalContainerName = "portal";
    private static final String[] SUPPORTED_FORMATS = new String[]{"json"};


    private IdentityManager identityManager_;

 @POST
    @Path("write")
    @Consumes({MediaType.APPLICATION_JSON})
    public Response write(@Context HttpServletRequest request,@Context UriInfo uriInfo,
                          String lines) throws Exception {
        MediaType mediaType = RestChecker.checkSupportedFormat("json", SUPPORTED_FORMATS);
        try {
            RepositoryService repositoryService = (RepositoryService) PortalContainer.getInstance().getComponentInstanceOfType(RepositoryService.class);
            ManageableRepository manageableRepository = repositoryService.getCurrentRepository();
            Session session = manageableRepository.getSystemSession("collaboration");
            try {
                Node cssNode = (Node) session.getItem("/sites/shared/css/skineditor");
                Node  jcrContentNode= cssNode.getNode("jcr:content") ;
                jcrContentNode.setProperty("jcr:data", new ByteArrayInputStream(lines.toString().getBytes()));
                session.save();
            } catch (PathNotFoundException e) {
                Node cssFolder = (Node) session.getItem("/sites/shared/css");
                Node node = cssFolder.addNode("skineditor", "nt:file");
                node.addMixin("exo:cssFile");
                node.setProperty("exo:sharedCSS",true);
                node.setProperty("exo:priority",0);
                node.setProperty("exo:presentationType","exo:cssFile");
                node.setProperty("exo:active",true);
                Node content=node.addNode("jcr:content","nt:resource");
                content.setProperty("jcr:data",new ByteArrayInputStream(new byte[0]));
                content.setProperty("jcr:encoding","UTF-8");
                content.setProperty("jcr:mimeType","text/css");
                content.setProperty("jcr:lastModified",new GregorianCalendar());
                content.setProperty("jcr:data", new ByteArrayInputStream(lines.toString().getBytes()));
                session.save();
            }
            JSONObject jsonGlobal = new JSONObject();
            jsonGlobal.put("message","file Updated");
            return Response.ok(jsonGlobal.toString(), mediaType).build();
        } catch (Exception e) {
            LOG.error(e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("An internal error has occured").build();
        }
    }


    @POST
    @Path("reset")
    @Consumes({MediaType.APPLICATION_JSON})
    public Response reset(@Context HttpServletRequest request,@Context UriInfo uriInfo) throws Exception {

        Identity sourceIdentity = Util.getAuthenticatedUserIdentity(portalContainerName);
        MediaType mediaType = RestChecker.checkSupportedFormat("json", SUPPORTED_FORMATS);
        try {
            JSONObject jsonGlobal = new JSONObject();
            RepositoryService repositoryService = (RepositoryService) PortalContainer.getInstance().getComponentInstanceOfType(RepositoryService.class);
            ManageableRepository manageableRepository = repositoryService.getCurrentRepository();
            Session session = manageableRepository.getSystemSession("collaboration");
            try {
                Node cssNode = (Node) session.getItem("/sites/shared/css/skineditor");
                Node  jcrContentNode= cssNode.getNode("jcr:content") ;
                jcrContentNode.setProperty("jcr:data", new ByteArrayInputStream(new byte[0]));
                session.save();
                jsonGlobal.put("message","reset done");
            } catch (PathNotFoundException e) {
                jsonGlobal.put("message","css file not found");
            }
            return Response.ok(jsonGlobal.toString(), mediaType).build();
        } catch (Exception e) {
            LOG.error(e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("An internal error has occured").build();
        }
    }


    @GET
    @Path("getstyles")
    @Consumes({MediaType.APPLICATION_JSON})
    public Response getStyles(@Context HttpServletRequest request,@Context UriInfo uriInfo) throws Exception {

        Identity sourceIdentity = Util.getAuthenticatedUserIdentity(portalContainerName);
        MediaType mediaType = RestChecker.checkSupportedFormat("json", SUPPORTED_FORMATS);
        try {

            if(sourceIdentity == null) {
                return Response.status(Response.Status.UNAUTHORIZED).build();
            }
            JSONObject jsonGlobal = new JSONObject();
            RepositoryService repositoryService = (RepositoryService) PortalContainer.getInstance().getComponentInstanceOfType(RepositoryService.class);
            ManageableRepository manageableRepository = repositoryService.getCurrentRepository();
            Session session = manageableRepository.getSystemSession("collaboration");
            Node cssNode = null;
            try {
                cssNode = (Node) session.getItem("/sites/shared/css/skineditor");
                Node  jcrContentNode= cssNode.getNode("jcr:content");
                String lines=jcrContentNode.getProperty("jcr:data").getString();
                String rule="";
                String skin="";
                if(!lines.equals("")){
                    for(String line : lines.split("\\}")){
                        rule= line.split("\\{")[0];
                        skin= line.split("\\{")[1];
                        if(rule.contains("ToolbarContainer")){
                            jsonGlobal.put("topHeadBg",skin);
                        }

                        if(rule.contains("uiDropdownWithIcon")&&!rule.contains("hover")){
                            jsonGlobal.put("topHeadCl",skin);
                        }

                        if(rule.contains("uiDropdownWithIcon")&&rule.contains("hover")){
                            jsonGlobal.put("topHeadHo",skin);
                        }

                        if(rule.contains("RightBodyTDContainer")){
                            jsonGlobal.put("pageBg",skin);
                        }

                        if(rule.contains("title")){
                            jsonGlobal.put("title",skin);
                        }

                        if(rule.contains("LeftNavigationTDContainer")&&!rule.contains("uiIcon")){
                            jsonGlobal.put("leftNavBg",skin);
                        }

                        if(rule.contains("LeftNavigationTDContainer")&&rule.contains("uiIcon")){
                            jsonGlobal.put("leftNavIcons",skin);
                        }

                        if(rule.contains("uiIconPLF24x24")){
                            jsonGlobal.put("topHeadIcons",skin);
                        }
                    }
                }
            } catch (PathNotFoundException e) {
                LOG.info("Css file not found");
            }
            return Response.ok(jsonGlobal.toString(), mediaType).build();
        } catch (Exception e) {
            LOG.error(e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("An internal error has occured").build();
        }
    }
}

