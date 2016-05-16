-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 15, 2016 at 08:35 PM
-- Server version: 5.5.49-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `project_dashboard`
--

-- --------------------------------------------------------

--
-- Table structure for table `discussion`
--

CREATE TABLE IF NOT EXISTS `discussion` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `message` text COLLATE utf8mb4_unicode_ci,
  `creation_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `user_id` int(11) unsigned DEFAULT NULL,
  `discussion_id` int(11) unsigned DEFAULT NULL,
  `project_id` int(11) unsigned DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_foreignkey_discussion_discussion` (`discussion_id`),
  KEY `index_foreignkey_discussion_user` (`user_id`),
  KEY `index_foreignkey_discussion_project` (`project_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=6 ;

--
-- Dumping data for table `discussion`
--

INSERT INTO `discussion` (`id`, `message`, `creation_date`, `modified_date`, `user_id`, `discussion_id`, `project_id`, `title`) VALUES
(1, 'Morbi faucibus eget arcu ac laoreet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec porta ut enim nec pretium. Aliquam eget ligula aliquet, vulputate mauris quis, bibendum nisi.\n\nVestibulum placerat sollicitudin augue, vel interdum lorem varius quis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla vitae libero vel sapien eleifend feugiat. Curabitur et arcu nec lectus egestas vulputate sed at lacus.', '2014-05-29 23:50:51', '2014-05-29 23:50:51', 1, 1, 1, 'What''s up doc?'),
(5, 'Cras tincidunt dui in quam eleifend, non semper dui laoreet. In sollicitudin consectetur tellus. Ut tincidunt augue vel ipsum euismod, ut egestas mi tristique. Aliquam quis viverra velit. Maecenas convallis, nisi vel eleifend gravida, turpis est euismod leo, et faucibus libero magna vitae eros. Aenean in urna et diam malesuada pulvinar. Pellentesque congue ipsum eget ligula semper eleifend. Curabitur convallis sapien eleifend, mattis erat non, suscipit nunc. Nam imperdiet est tellus, eget sollicitudin nisi lacinia quis. Sed egestas semper pulvinar. Nulla vitae lectus massa. Nunc sem metus, tempor adipiscing sem vitae, scelerisque accumsan orci. Mauris pharetra nulla vitae lobortis imperdiet. Sed et leo sed elit cursus interdum ac sed dolor. Nam vel egestas erat.\n\nSed at quam vitae lorem blandit ullamcorper. Fusce consequat libero nisl, sit amet gravida ante accumsan eu. Nullam eget fringilla mauris. Sed at nulla a tellus interdum ultrices quis ut lectus. Praesent lacinia diam ut orci bibendum, vel auctor purus gravida. Proin sagittis eros vitae eros fermentum vestibulum. Etiam sed ante nec justo pretium tempus.', '2014-06-07 17:02:23', '2014-06-07 17:02:23', 2, 1, 1, 'Nothing much');

-- --------------------------------------------------------

--
-- Table structure for table `file`
--

CREATE TABLE IF NOT EXISTS `file` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `original_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mime_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `upload_date` datetime DEFAULT NULL,
  `user_id` int(11) unsigned DEFAULT NULL,
  `project_id` int(11) unsigned DEFAULT NULL,
  `discussion_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_foreignkey_file_user` (`user_id`),
  KEY `index_foreignkey_file_project` (`project_id`),
  KEY `index_foreignkey_file_discussion` (`discussion_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE IF NOT EXISTS `project` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `project_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_foreignkey_project_project` (`project_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=5 ;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `name`, `status`, `creation_date`, `modified_date`, `project_id`) VALUES
(1, 'project one', 'active', '2014-05-29 23:50:51', '2014-08-16 18:09:42', 1),
(2, 'project two2', 'active', '2014-07-19 12:48:17', '2014-08-16 18:10:35', NULL),
(3, 'project threek', 'active', '2014-07-19 12:50:48', '2014-08-16 15:49:12', NULL),
(4, 'project four', 'active', '2014-07-19 14:02:02', '2014-08-16 13:44:23', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `project_user`
--

CREATE TABLE IF NOT EXISTS `project_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(11) unsigned DEFAULT NULL,
  `user_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_b3c37010a01aa40a2dbc9762ecda045e19efab7a` (`project_id`,`user_id`),
  KEY `index_for_project_user_project_id` (`project_id`),
  KEY `index_for_project_user_user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=15 ;

--
-- Dumping data for table `project_user`
--

INSERT INTO `project_user` (`id`, `project_id`, `user_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(13, 2, 1),
(14, 2, 6);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hashit` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `api_key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=7 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `first_name`, `last_name`, `username`, `email`, `role`, `hashit`, `api_key`, `creation_date`, `modified_date`) VALUES
(1, 'Test', 'Admin', 'testadmin', 'testadmin@example.com', 'administrator', '$6$c554b5fc99dcd56e$IPaxcCE56v7SvPJmSDSIw5kMdx.XjV13HWeLdiMStmN1JNDhNbDykf0t1jHfIu2Dt0VMpCwUFxjOiaCTUF9Z5/', '3aff15d1c107b5c4c7a295104128e94beaa6c023d7418cd73a44e8eecca1523c', '2014-05-29 23:50:50', '2016-05-13 17:38:29'),
(2, 'Bob', 'Client', 'bclient', 'bob.client@example.com', 'client', '$6$05016dd4af7df46f$gb7kYmx2UwBGnqxn1kuVnMMxS06r9AC9MZrsXoVxO3NlYGR7NfLBgOqFxW1T2PdRymzPqqOTLkdaCZIVSzAVu0', 'f9954a44b91f8612fb99f54d34f1205e', '2014-05-29 23:55:23', '2016-05-13 17:31:33'),
(5, 'George', 'Developer', 'gdeveloper', 'george.developer@example.com', 'developer', '$6$e3489122c6373b88$xHHw8yLX6meygZxWbnypIa32NLd15zvldoFeQffMOFK/jZbgoNDLCfe7JWARfBhn9alFRTpdiYybg30buRni70', 'a57638f0410497541f0e131d29724058', '2014-07-15 01:32:08', '2016-05-13 17:32:02'),
(6, 'Philbert', 'Developer', 'pdeveloper', 'philbert.developer@example.com', 'developer', '$6$a58f131dda184f73$CSF4pOzsw.vjpGu4LqXPxqZRV6TorlE9QQjYGItD9XFr8VXls1lu1VF0EU3H6fZy2pD3StFB1cyhdRuGu4zlC0', 'e2bd17586e4faf8e698b560891fff29c', '2014-07-19 18:21:18', '2016-05-13 17:32:31');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `discussion`
--
ALTER TABLE `discussion`
  ADD CONSTRAINT `cons_fk_discussion_discussion_id_id` FOREIGN KEY (`discussion_id`) REFERENCES `discussion` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `cons_fk_discussion_project_id_id` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `cons_fk_discussion_user_id_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `file`
--
ALTER TABLE `file`
  ADD CONSTRAINT `cons_fk_file_discussion_id_id` FOREIGN KEY (`discussion_id`) REFERENCES `discussion` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `cons_fk_file_project_id_id` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `cons_fk_file_user_id_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `cons_fk_project_project_id_id` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `project_user`
--
ALTER TABLE `project_user`
  ADD CONSTRAINT `project_user_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `project_user_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
