import Calendar from "@/components/Calendar/Calendar";
import TimeSelector from "@/components/TimeSelector/TimeSelector";

const HomePage = () => {
    return (
        <div>
            <div>
                <TimeSelector/>
            </div>
            <div>
                <Calendar/>
            </div>
        </div>
    )
}

export default HomePage;
