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

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='' element={<ListCategory />}/>
        <Route path='/categories' element={<ListCategory />}/>
        <Route path='/categories/create' element={<CreateCategory />}/>
        <Route path='/categories/edit/:id' element={<EditCategory />}/>
        <Route path='/cast-members' element={<ListCastMembers />} />
        <Route path='/cast-members/create' element={<CreateCastMember />} />
        <Route path='/cast-members/edit/:id' element={<EditCastMember />} />
        <Route path='/genres' element={<ListGenre />} />
        <Route path='/genres/create' element={<CreateGenre />} />
        <Route path='/genres/edit/:id' element={<EditGenre />} />
        <Route path='/videos' element={<ListVideo />} />
        <Route path='/videos/create' element={<CreateVideo />} />
        <Route path='/videos/edit/:id' element={<EditVideo />} />
        <Route path='*' element={
          <Box sx={{color: "white"}}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h2">Page Not Found</Typography>
          </Box>
        }/>
      </Routes>
    </Layout>
  )
}

export default App;
