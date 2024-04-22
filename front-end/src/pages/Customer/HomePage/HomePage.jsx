import HeaderCustomer from "../../../components/HeaderCustomer/HeaderCustomer";
import SlideShow from "../../../components/SlideShow/SlideShow";

function HomePage() {
    return (
        <div className="h-screen flex flex-col">
        <HeaderCustomer />
        <div className="flex justify-center my-10" >
            {" "}
            {/* Add flex here */}
            <SlideShow className="w-2/3" />
            <div className="w-1/4 flex flex-col items-center justify-center h-full">
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/storgeimage.appspot.com/o/SliderImage%2Fslider4.jpg?alt=media&token=135edbe7-ab5b-4145-af9e-2565f768120c"
                    alt="Slider Image"
                    className="w-3/4 h-1/2 object-cover rounded-t-lg"
                />
                <div className="bg-primary w-3/4 h-1/2 rounded-b-lg">
                    <p className="mt-9 text-secondary text-3xl text-center ">
                        Tìm hiểu thêm về 
                    </p>
                    <p className="text-5xl ml-5 font-bold text-center text-secondary" > Agrimart</p>
                </div>
                
            </div>
        </div>
        </div>
    );
}

export default HomePage;
