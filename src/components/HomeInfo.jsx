import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";
import { MdCropRotate } from "react-icons/md";

const HomeInfo = ({ currentStage }) => {
  if (currentStage === 1)
    return (
      <div className='neo-brutalism-blue py-5 px-8 mx-5 text-center'>
        <h1 className='sm:text-2xl text-xl font-bold text-white sm:leading-snug leading-snug'>
          Hey, I'm{" "}
          <span className='font-extrabold text-white underline underline-offset-4 decoration-sky-300'>
            Shubham Verma
          </span>{" "}
          👋
        </h1>
        <p className='mt-2 text-sm sm:text-base text-blue-100 font-medium leading-relaxed'>
          Frontend Developer · ML Enthusiast · Problem Solver
        </p>
        <p className='mt-3 text-xs sm:text-sm text-blue-200 font-normal flex items-center justify-center gap-1'>
          Rotate the globe to explore{" "}
          <MdCropRotate className='inline text-base animate-spin-slow' />
        </p>
      </div>
    );

  if (currentStage === 2) {
    return (
      <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
          I'm Shubham Verma, a web developer who enjoys <br />
          creating clean UI/UX and smart digital solutions.
        </p>
        <Link to='/about' className='neo-brutalism-white neo-btn'>
          Learn more
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  if (currentStage === 3) {
    return (
      <div className='info-box'>
        <p className='font-medium text-center sm:text-xl'>
          I have worked on several projects over the years. <br /> Curious about the impact?
        </p>
        <Link to='/projects' className='neo-brutalism-white neo-btn'>
          Visit my portfolio
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  if (currentStage === 4) {
    return (
      <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
          Need a project done or looking for a dev? <br /> I'm just a few keystrokes away
        </p>
        <Link to='/contact' className='neo-brutalism-white neo-btn'>
          Let's talk
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  return null;
};

export default HomeInfo;
