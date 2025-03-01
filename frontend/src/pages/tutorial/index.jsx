import Layout from "../../components/layouts/Layout"


const Tutorial = () => {
    return (
        <Layout>
             <section className="grid md:grid-cols-2 pt-5 px-2">
                   
                    <div className="flex px-10 py-7 md:px-20 md:py-10 justify-center items-center">
                        <img className="hidden md:flex" src="/svg/seminar.svg" alt="Innovation" />
                        <img className="md:hidden" src="/svg/learning.svg" alt="Learning" />
                    </div>
                </section>
        </Layout>
    )
}

export default Tutorial
