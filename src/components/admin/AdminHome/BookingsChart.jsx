import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import PropTypes from "prop-types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BookingsChart = ({ bookingData }) => {
  // Function to get month-wise booking counts
  const getBookingCountsByMonth = (bookings) => {
    const monthCounts = Array(12).fill(0); // Create an array for 12 months

    bookings.forEach((booking) => {
      const checkInDate = new Date(booking.startDate);
      const month = checkInDate.getMonth(); // getMonth() returns month index (0-11)
      monthCounts[month] += 1;
    });

    return monthCounts;
  };

  const bookingCounts = getBookingCountsByMonth(bookingData);

  // Data for the chart
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Bookings",
        data: bookingCounts,
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar color with transparency
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(75, 192, 192, 0.8)", // Hover effect
      },
    ],
  };

  // Enhanced Options for a fancy look and responsive behavior
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to fill container
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#333", // Darker label color
          font: {
            size: 16, // Increase font size
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.7)", // Dark background for tooltips
        titleFont: { size: 18 }, // Larger tooltip title
        bodyFont: { size: 14 }, // Tooltip body size
        padding: 10, // Padding around tooltip text
      },
      title: {
        display: true,
        text: "Monthly Bookings Rate",
        color: "#4A5568", // Text color
        font: {
          size: 24, // Larger title
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#4A5568", // Darker y-axis ticks
          font: {
            size: 14, // Larger font for y-axis
          },
        },
        grid: {
          color: "rgba(200, 200, 200, 0.3)", // Subtle grid lines
        },
      },
      x: {
        ticks: {
          color: "#4A5568", // Darker x-axis ticks
          font: {
            size: 14, // Larger font for x-axis
          },
        },
        grid: {
          color: "rgba(200, 200, 200, 0.3)", // Subtle grid lines
        },
      },
    },
    animation: {
      duration: 2000, // Smooth, slower animation
      easing: "easeInOutBounce",
    },
  };

  return (
    <div className="container mx-auto px-4 max-md:px-0 font-raleway">
      <div className="w-full lg:w-3/4 xl:w-2/3 mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="relative h-[250px] sm:h-[500px] lg:h-[600px]">
          {" "}
          {/* Height set for responsiveness */}
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

// Add prop-types validation
BookingsChart.propTypes = {
  bookingData: PropTypes.arrayOf(
    PropTypes.shape({
      startDate: PropTypes.string.isRequired, // Assuming checkInDate is a string
      endDate: PropTypes.string.isRequired, // Same for checkOutDate
    })
  ).isRequired,
};

export default BookingsChart;
