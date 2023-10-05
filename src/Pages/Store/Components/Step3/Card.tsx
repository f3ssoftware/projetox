import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";

export default function Card({ formBody }: { formBody: any }) {

    return (
        <div>
            {/* <div className="grid" style={{ marginBottom: '2%' }}>
                            <div className="col-12 md:col-6" style={{ marginTop: '2%' }}>
                                <span className="p-float-label" >
                                    <InputText id="email" name='email'
                                        value={formik.values.email}
                                        onChange={(e) => {
                                            formik.setFieldValue("email", e.target.value);
                                            setEmailValue(e.target.value);
                                        }}

                                        className={classNames({
                                            "p-invalid": formik.touched.email && formik.errors.email,
                                        })}

                                    />

                                    {formik.touched.email && formik.errors.email ? (
                                        <div style={{ color: 'red', fontSize: '12px', fontFamily: 'Roboto' }}>{formik.errors.email}</div>
                                    ) : null}

                                    <label htmlFor="email">Email*</label>
                                </span>
                            </div>
                            <div className="col-12 md:col-3" style={{ marginTop: '2%' }}>
                                <span className="p-float-label" >
                                    <InputMask
                                        id="telphone" name='telphone' onChange={(e: InputMaskChangeEvent) => { setTelphoneValue(e.target.value?.replace(/[^\d]/g, "")); formik.setFieldValue("telphone", e.target.value?.replace(/[^\d]/g, "")) }}
                                        mask="+99 99 9999999?99"

                                        className={classNames({
                                            "p-invalid": formik.touched.telphone && formik.errors.telphone,
                                        })} />

                                    {formik.touched.telphone && formik.errors.telphone ? (
                                        <div style={{ color: 'red', fontSize: '12px', fontFamily: 'Roboto' }}>{formik.errors.telphone}</div>
                                    ) : null}
                                    <label htmlFor="telphone">Telefone*</label>
                                </span>
                            </div>
                            <div className="col-12 md:col-3" style={{ marginTop: '2%' }}>
                                <span className="p-float-label" >

                                    <InputMask id="EIN" name='EIN' onChange={(e: InputMaskChangeEvent) => { setEIN(e.target.value?.replace(/[^\d]/g, "")); formik.setFieldValue("EIN", e.target.value?.replace(/[^\d]/g, "")) }}
                                        mask="99.999.999 /  9999-99"
                                        //XX.XXX.XXX/0001-XX

                                        className={classNames({
                                            "p-invalid": formik.touched.EIN && formik.errors.EIN,
                                        })} />
                                    {formik.touched.EIN && formik.errors.EIN ? (
                                        <div style={{ color: 'red', fontSize: '12px', fontFamily: 'Roboto' }}>{formik.errors.EIN}</div>
                                    ) : null}

                                    <label htmlFor="EIN">CNPJ*</label>
                                </span>
                            </div>
                        </div> */}
        </div>

    )
}