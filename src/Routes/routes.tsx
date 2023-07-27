import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Login from '../Pages/Login/Login'
import Register from '../Pages/Register/Register'
import Balance from '../Pages/Balance/balance'
import Due_Dated from '../Pages/Balance/due_dated'
import Payable from '../Pages/Balance/payable'
import Receivable from '../Pages/Balance/receivable'
import Admin from '../Pages/Admin/Admin'
import Erro from '../Pages/Erro/erro'
import Wallet from '../Pages/Wallet/Wallet'
import Verifying from '../Pages/Verifying/verifying'
import { Casket } from '../Shared/Casket/Casket';


function Rotas() {

    return (
        <BrowserRouter>
            <Routes>

                <Route path='/' element={<Verifying />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />

                <Route element={<Casket />}>
                    <Route path='/balance' element={<Balance />} />
                    <Route path='/admin' element={<Admin />} />
                    <Route path='/wallet' element={<Wallet />} />
                    <Route path='/due_dated' element={<Due_Dated />} />
                    <Route path='/payable' element={<Payable />} />
                    <Route path='/receivable' element={<Receivable />} />
                 

                </Route>

                <Route path='*' element={<Erro />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;