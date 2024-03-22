import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Login from '../Pages/Login/Login'
import EmailRegister from '../Pages/Register/Email_Register'
import Register from '../Pages/Register/Register_Step1'
import Balance from '../Pages/Balance/balance'
import Due_Dated from '../Pages/Balance/due_dated'
import Payable from '../Pages/Balance/payable'
import Receivable from '../Pages/Balance/receivable'
import Dashboard from '../Pages/Dashboard/Admin'
import Erro from '../Pages/Erro/erro'
import Wallet from '../Pages/Wallet/Wallet'
import Verifying from '../Pages/Verifying/verifying'
import { Casket } from '../Shared/Casket/Casket';
import WalletDetail from '../Pages/Wallet/WalletDetail/WalletDetail';
import StoreMainPage from '../Pages/Store/Components/StoreMainPage';
import Store2nd from '../Pages/Store/Components/Store2ndPage';
import AuthUser from '../Pages/Register/Authenticate_user';
import Checkout from '../Pages/Store/New checkout/Checkout';


function Rotas() {

    return (
        <BrowserRouter>
            <Routes>

                <Route path='/' element={<Verifying />} />
                <Route path='/login' element={<Login />} />
                <Route path='/email_register' element={<EmailRegister />} />
                <Route path='/register' element={<Register />} />
                <Route path='/token' element={<AuthUser />} />
                <Route path='/checkout/:id' element={<Checkout />} />

                <Route element={<Casket />}>
                    <Route path='/balance' element={<Balance />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/wallet' element={<Wallet />} />
                    <Route path='/wallet/detail/:selectedWallet' element={<WalletDetail />} />
                    <Route path='/due_dated' element={<Due_Dated />} />
                    <Route path='/payable' element={<Payable />} />
                    <Route path='/receivable' element={<Receivable />} />
                    <Route path='/store' element={<StoreMainPage />} />
                    <Route path='/storeresume/:cardId' element={<Store2nd />} />

                </Route>

                <Route path='*' element={<Erro />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;