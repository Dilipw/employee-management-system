-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 18, 2026 at 02:47 AM
-- Server version: 8.4.3
-- PHP Version: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `employee_management_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT (now()),
  `updated_at` datetime DEFAULT (now())
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `full_name`, `email`, `phone`, `department`, `designation`, `password`, `is_active`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 'Dilip Waghmare', 'dilipwaghmarep15@gmail.com', '9876543210', 'IT ', 'SDE', '$2b$12$AnbUbkm4iTedZt3q6WXfWOkYRWgErMRAlRcZITBOsVV.jH1dJnjBi', 1, 0, '2026-05-17 04:23:49', '2026-05-17 07:51:13'),
(2, 'Dilip Waghmare', 'dilip.waghmare@example.com', '9876543210', 'IT', 'Software Engineer', '$2b$12$wcA3aw0JrR5DQ0YUUQTrw.PtElPWnfXpGC0jUsKsMOUO.00AGt5gi', 1, 0, '2026-05-17 06:40:08', '2026-05-17 06:40:08'),
(3, 'Rahul Sharma', 'rahul.sharma@example.com', '9876543211', 'HR', 'HR Manager', '$2b$12$qJIcbMMroSrLSzeM8FdwEOVGFhdBs/qXQVNqbokIIaDVjm0MwaGx2', 1, 0, '2026-05-17 06:40:25', '2026-05-17 06:40:25'),
(4, 'Priya Verma', 'priya.verma@example.com', '9876543212', 'Finance', 'Accountant', '$2b$12$YQmGaGjUw5TqsaO7O/mWLOUUZ9FdfwKA6q0hR/tacD6y33FRLWDq.', 1, 0, '2026-05-17 06:40:35', '2026-05-17 06:40:35'),
(5, 'Amit Joshi', 'amit.joshi@example.com', '9876543213', 'Marketing', 'Marketing Executive', '$2b$12$2MXzfFwdmFT7wI6XXIf6ouf4X04FvQeOa6Nwxuer/n4g4ILWk7xSS', 1, 0, '2026-05-17 06:40:48', '2026-05-17 06:40:48'),
(6, 'Sneha Patil', 'sneha.patil@example.com', '9876543214', 'IT', 'Frontend Developer', '$2b$12$YMwPQ0o5Z9wk2ZJNz0tzleqHyD24lRoJkY/FDOCA4ie6hgSBDAw9q', 1, 0, '2026-05-17 06:40:59', '2026-05-17 06:40:59'),
(7, 'Karan Mehta', 'karan.mehta@example.com', '9876543215', 'IT', 'Backend Developer', '$2b$12$W8cIGeOvrMetl7RUSYOOvOyKOBOQ7AjFXfCNFgkyriF7idR7ryVVS', 1, 0, '2026-05-17 06:41:15', '2026-05-17 06:41:15'),
(8, 'Neha Kulkarni', 'neha.kulkarni@example.com', '9876543216', 'HR', 'Recruiter', '$2b$12$VKHUnqh4p/L6.4u3UzmR.O1AcqkrlGb8JYEThvWUPDMaFKOQwtSMG', 1, 0, '2026-05-17 06:41:24', '2026-05-17 06:41:24'),
(9, 'Rohit Deshmukh', 'rohit.deshmukh@example.com', '9876543217', 'Finance', 'Financial Analyst', '$2b$12$8FmIEDqvDZf9wbUxg0GEau4ZlasdAagvbMYLdVIDRHHdWICUyYqa6', 1, 0, '2026-05-17 06:41:40', '2026-05-17 06:41:40'),
(10, 'Anjali Nair', 'anjali.nair@example.com', '9876543218', 'Marketing', 'SEO Specialist', '$2b$12$utHBXqci9HZwgECjl5tnYO.hwAvyj0n6SzQCfNBqYyfMv4ho4UcZ2', 1, 0, '2026-05-17 06:41:52', '2026-05-17 06:41:52'),
(11, 'Vikas Singh', 'vikas.singh@example.com', '9876543219', 'IT', 'DevOps Engineer', '$2b$12$Lk0Jmub4pwwp.SnlvaPPwuMZ22Zhzz0zuMHYby.GAyhYY0u3P7NaC', 1, 0, '2026-05-17 06:42:02', '2026-05-17 06:42:02'),
(12, 'Pooja Chavan', 'pooja.chavan@example.com', '9876543220', 'Finance', 'Tax Consultant', '$2b$12$mQtieMkG8m/9hh9Lf.dD0.zM8U2q96s4U55ANAy2LXU3Y.vCSBxWq', 1, 0, '2026-05-17 06:42:12', '2026-05-17 06:42:12'),
(13, 'ABHISHEK BALU WAGHMARE', 'waghmareabhishek075@gmail.com', '8010657080', 'HR', 'Junior HR', '$2b$12$DUzMgs4zYla2.y79RA0uKeQOKjHFNF9r/xtEEtXOLODZCsx6aBvs6', 1, 0, '2026-05-17 08:20:38', '2026-05-17 08:20:38'),
(14, 'Ajit Chaudary', 'ajit123@gmail.com', '7057175627', 'IT', 'Software Developer', '$2b$12$hkOre6gYHxmB2H3h4UJPS.G6xqJFptGbJAgeed/J2DK4Y7PMB03hm', 1, 0, '2026-05-17 08:25:28', '2026-05-17 08:25:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `ix_employees_id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
