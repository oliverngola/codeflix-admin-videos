import { Route, Routes } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import { Layout } from './components/Layout';
import { ListCategory } from './features/categories/ListCategory';
import { CreateCategory } from './features/categories/CreateCategory';
import { EditCategory } from './features/categories/EditCategory';
import { ListCastMembers } from './features/cast/ListCastMembers';
import { CreateCastMember } from './features/cast/CreateCastMember';
import { EditCastMember } from './features/cast/EditCastMember';
import { CreateGenre } from './features/genre/CreateGenre';
import { EditGenre } from './features/genre/EditGenre';
import { ListGenre } from './features/genre/ListGenre';
import { CreateVideo } from './features/videos/CreateVideo';
import { EditVideo } from './features/videos/EditVideo';
import { ListVideo } from './features/videos/ListVideo';
import { UploadList } from './features/uploads/UploadList';
import { ProtectedRoute } from './components/ProtectedRoute';
import Login from './components/Login';

function App() {
  return (
    <div data-testid="app">
      <Layout>
        <UploadList />
        <Routes>
          <Route path="/" element={<ListCategory />} />

          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Category */}
          <Route 
            path='/categories' 
            element={
              <ProtectedRoute>
                <ListCategory />
              </ProtectedRoute>}
          />
          <Route 
            path='/categories/create' 
            element={
              <ProtectedRoute>
                <CreateCategory />
              </ProtectedRoute>
            }
          />
          <Route 
            path='/categories/edit/:id' 
            element={
              <ProtectedRoute>
                <EditCategory />
              </ProtectedRoute>}
          />

          {/* Cast Members */}
          <Route 
            path='/cast-members' 
            element={
              <ProtectedRoute>
                <ListCastMembers />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/cast-members/create' 
            element={
              <ProtectedRoute>
                <CreateCastMember />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/cast-members/edit/:id' 
            element={
              <ProtectedRoute>
                <EditCastMember />
              </ProtectedRoute>
            } 
          />

          {/* Genres */}
          <Route 
            path='/genres' 
            element={
              <ProtectedRoute>
                <ListGenre />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/genres/create' 
            element={
              <ProtectedRoute>
                <CreateGenre />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/genres/edit/:id' 
            element={
              <ProtectedRoute>
                <EditGenre />
              </ProtectedRoute>
            } 
          />

          {/* Videos */}
          <Route 
            path='/videos' 
            element={
              <ProtectedRoute>
                <ListVideo />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/videos/create' 
            element={
              <ProtectedRoute>
                <CreateVideo />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/videos/edit/:id' 
            element={
              <ProtectedRoute>
                <EditVideo />
              </ProtectedRoute>
            } 
          />

          <Route 
            path='*' element={
            <Box sx={{color: "white"}}>
              <Typography variant="h1">404</Typography>
              <Typography variant="h2">Page Not Found</Typography>
            </Box>
          }/>
        </Routes>
      </Layout>
    </div>
  )
}

export default App;
