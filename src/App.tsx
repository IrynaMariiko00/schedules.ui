import { Route, Routes } from 'react-router-dom'
import { LoginOverlay } from '~/auth/LoginOverlay'
import { Header } from '~/layout/Header'
import SchedulesPage from '~/pages/SchedulesPage/SchedulesPage'
import StudyProgramsPage from '~/pages/StudyProgramsPage/StudyProgramsPage'
import TeachersPage from '~/pages/TeachersPage/TeachersPage'

export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<SchedulesPage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/study-programs" element={<StudyProgramsPage />} />
      </Routes>
      <LoginOverlay />
    </>
  )
}
