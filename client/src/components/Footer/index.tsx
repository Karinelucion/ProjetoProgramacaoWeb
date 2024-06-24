// import AuthService from "@/service/AuthService";

export function Footer() {
    return (
        <>
            <div className="container p-4">

                <section className="mb-4">
                    <a className="btn btn-primary btn-floating m-1"  href="https://www.linkedin.com/in/matheus-martarello-gutstein-aa40a3206/" role="button"><i className="fab fa-linkedin-in"></i></a>
                    <a className="btn btn-primary btn-floating m-1"  href="https://github.com/m-artarello" role="button"><i className="fab fa-github"></i></a>
                </section>
                <section>
                    <form >
                        <div className="row d-flex justify-content-center">

                            <div className="col-auto">
                                <p className="pt-2">
                                    <strong>Receba novas ofertas diretamente no seu e-mail</strong>
                                </p>
                            </div>


                            <div className="col-md-5 col-12">

                                <div className="form-outline form-white">
                                    <input type="text" id="formWhite" className="form-control" name={"email"}  value={"email"} placeholder={"E-mail"}/>
                                    <label className="form-label" htmlFor="formWhite">Seu endereço de e-mail</label>
                                </div>
                            </div>

                            <div className="col-auto">
                                <button type="submit" className="btn btn-outline-light mb-4">
                                    Assinar
                                </button>
                            </div>
                        </div>
                    </form>
                </section>
                <section className="mb-4">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                        distinctio earum repellat quaerat voluptatibus placeat nam,
                        commodi optio pariatur est quia magnam eum harum corrupti dicta,
                        aliquam sequi voluptate quas.
                    </p>
                </section>
            </div>

            <div className="text-center p-3" >
                <a className="text-white" href="https://github.com/m-artarello">© 2022 Copyright: Matheus Martarello</a>
            </div>
        </>)
    }

