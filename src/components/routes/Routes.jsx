import Login from "../pages/web/Login";
import Gallery from "../pages/web/Gallery";
import Photos from "../pages/web/Photos";
import Dashboard from "../pages/admin/Dashboard";
import GalleryList from "../pages/admin/gallery/GalleryList";
import CreateGallery from "../pages/admin/gallery/CreateGallery";
import EditGallery from "../pages/admin/gallery/EditGallery";
import CollectionList from "../pages/admin/collection/CollectionList";
import EditCollection from "../pages/admin/collection/EditCollection";
import Profile from "../pages/profile/Profile";
import PhotosList from "../pages/admin/photos/PhotosList";
import CreatePhotos from "../pages/admin/photos/CreatePhotos";
import EditPhotos from "../pages/admin/photos/EditPhotos";
import ViewPhoto from "../pages/admin/photos/ViewPhoto";
import ViewGallery from "../pages/admin/gallery/ViewGallery";
import ViewCollection from "../pages/admin/collection/ViewCollection";
import CollectionDetails from "../pages/web/CollectionDetails";

export const routes = [
  { path: "login", element: <Login /> },
  { path: "collection/:collectionId", element: <CollectionDetails /> },
  { path: "gallery/:galleryId", element: <Gallery /> },
];

export const adminRoute = [
  { path: "dashboard", element: <Dashboard /> },
  { path: "profile", element: <Profile /> },
  { path: "gallery", element: <GalleryList /> },
  { path: "gallery/create", element: <CreateGallery /> },
  { path: "gallery/edit/:galleryId", element: <EditGallery /> },
  { path: "gallery/view/:galleryId", element: <ViewGallery /> },
  { path: "collection", element: <CollectionList /> },
  { path: "collection/edit", element: <EditCollection /> },
  { path: "collection/view/:collectionId", element: <ViewCollection /> },
  { path: "photos", element: <PhotosList /> },
  { path: "photos/create", element: <CreatePhotos /> },
  { path: "photos/edit/:photoId", element: <EditPhotos /> },
  { path: "photos/view/:photoId", element: <ViewPhoto /> },
];
