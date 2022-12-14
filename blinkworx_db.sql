-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 14, 2022 at 03:49 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blinkworx_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `order_description` varchar(200) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `order_description`, `date`) VALUES
(2, 'demo order add testing-2 ', '2022-12-12 22:03:56'),
(3, 'demo order add testing-3 ', '2022-12-12 22:04:16'),
(13, 'my first order add on ', '2022-12-14 19:37:33');

-- --------------------------------------------------------

--
-- Table structure for table `order_product_map`
--

CREATE TABLE `order_product_map` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_product_map`
--

INSERT INTO `order_product_map` (`id`, `order_id`, `product_id`) VALUES
(4, 2, 4),
(5, 2, 2),
(6, 3, 3),
(7, 3, 4),
(30, 13, 5),
(31, 13, 6),
(32, 13, 3);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `p_id` int(11) NOT NULL,
  `p_name` varchar(50) NOT NULL,
  `p_description` varchar(200) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`p_id`, `p_name`, `p_description`, `date`) VALUES
(1, 'mobile', 'mi mobile phone modal -6A', '2022-12-12 20:28:52'),
(2, 'leptop', 'Dell 10th gen leptop for 8 gb ram', '2022-12-12 20:31:54'),
(3, 'led tv', 'crown 40 inch full HD tv', '2022-12-12 20:33:46'),
(4, 'tvs star ', 'Price Starts at ₹ 74,990*, Low Downpayment of ₹ 9,999*, 5.55% ROI, 5 Years Warranty*. Check On-Road Price, Features, Specifications, Mileage, Reviews, Offers, Videos, Images. On-Road Price. Colors. Co', '2022-12-12 20:36:24'),
(5, 'This is a car', 'Car', '2022-12-14 19:23:13'),
(6, 'This is a Bike', 'Bike', '2022-12-14 19:25:56'),
(7, 'phone', 'mi', '2022-12-14 19:28:31'),
(8, 'HP Laptop', 'this is a hp laptop', '2022-12-14 19:29:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `order_product_map`
--
ALTER TABLE `order_product_map`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`p_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `order_product_map`
--
ALTER TABLE `order_product_map`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
