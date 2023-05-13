const Spinner = () => {
    return (
      <div className="w-12 h-12 mx-auto justify-center items-center text-center text-blue-600">
         <svg viewBox="0 0 50 50">
  <circle cx="25" cy="25" r="20" fill="none" stroke-width="5" stroke="red" stroke-dasharray="202" stroke-dashoffset="101" >
    <animate attributeName="stroke-dashoffset" dur="2s" values="101;0" repeatCount="indefinite" />
  </circle>
  <circle cx="25" cy="25" r="20" fill="none" stroke-width="5" stroke="green" stroke-dasharray="202" stroke-dashoffset="101" >
    <animate attributeName="stroke-dashoffset" dur="2s" values="101;0" repeatCount="indefinite" />
  </circle>
  <circle cx="25" cy="25" r="20" fill="none" stroke-width="5" stroke="blue" stroke-dasharray="202" stroke-dashoffset="101" >
    <animate attributeName="stroke-dashoffset" dur="2s" values="101;0" repeatCount="indefinite" />
  </circle>
</svg>

      </div>

    );
};

export default Spinner;