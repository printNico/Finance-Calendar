import Calendar from "@/components/Calendar/Calendar";
import TimeSelector from "@/components/TimeSelector/TimeSelector";

type HomePageProps = {

}

const HomePage = (props: HomePageProps) => {
  return (
    <div>
        <TimeSelector/>
      <Calendar/>
    </div>
  )
}

export default HomePage;
