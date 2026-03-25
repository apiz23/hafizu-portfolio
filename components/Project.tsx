"use client";

import { Badge } from "./ui/badge";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { TextAnimate } from "./ui/text-animate";
import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  Code2,
  Rocket,
  Sparkles,
  Calendar,
  Layers,
  Eye,
  ArrowRight,
} from "lucide-react";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";

type ProjectType = {
  id: string;
  title: string;
  description: string;
  image_src: string;
  github_link: string;
  visit_link: string;
  featured: boolean;
  category: string;
  year: string;
  badges: string[];
};

export default function Project() {
  const [filter, setFilter] = useState<string>("all");
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();

        setProjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const categories = [
    { id: "all", label: "All Projects", icon: Sparkles },
    { id: "fullstack", label: "Full Stack", icon: Layers },
    { id: "webapp", label: "Web Apps", icon: Rocket },
    { id: "frontend", label: "Frontend", icon: Eye },
  ];

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  // Split projects into featured and regular
  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const regularProjects = filteredProjects.filter((p) => !p.featured);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="projects"
      className="py-20 md:py-32 relative overflow-hidden bg-background"
    >
      {/* Simple background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Rocket className="h-4 w-4" />
              <span className="text-sm font-medium">My Work</span>
            </div>
          </motion.div>

          <TextAnimate
            animation="slideUp"
            by="word"
            className="text-4xl md:text-6xl font-bold text-foreground mb-6"
          >
            Featured Projects
          </TextAnimate>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            A collection of my best work and open source contributions
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Button
                key={cat.id}
                variant={filter === cat.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter(cat.id)}
                className="rounded-full"
              >
                <Icon className="h-4 w-4 mr-2" />
                {cat.label}
              </Button>
            );
          })}
        </motion.div>

        {/* Projects Grid */}
        <div className="max-w-6xl mx-auto">
          {/* Featured Projects - Horizontal Layout */}
          {featuredProjects.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-8 mb-12"
            >
              {featuredProjects.map((project, index) => (
                <motion.div key={project.title} variants={itemVariants}>
                  <Card className="group overflow-hidden bg-card border-border hover:border-primary/30 transition-all duration-300">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Image - Fixed for mobile */}
                      <div className="relative h-48 md:h-full min-h-[200px] overflow-hidden bg-muted">
                        <Image
                          alt={project.title}
                          src={project.image_src}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          priority={index === 0}
                        />
                        <Badge className="absolute top-4 left-4 bg-primary text-white z-10">
                          Featured
                        </Badge>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3 flex-wrap">
                          <Calendar className="h-4 w-4 shrink-0" />
                          <span>{project.year}</span>
                          <span className="w-1 h-1 rounded-full bg-muted-foreground shrink-0" />
                          <span className="capitalize">{project.category}</span>
                        </div>

                        <CardTitle className="text-2xl font-bold mb-3">
                          {project.title}
                        </CardTitle>

                        <CardDescription className="text-muted-foreground mb-4">
                          {project.description}
                        </CardDescription>

                        {/* Tech badges */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.badges.slice(0, 5).map((badge, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="text-xs"
                            >
                              <Code2 className="h-3 w-3 mr-1 shrink-0" />
                              {badge}
                            </Badge>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                          <Button className="flex-1" asChild>
                            <Link href={project.visit_link} target="_blank">
                              <ExternalLink className="h-4 w-4 mr-2 shrink-0" />
                              Live Demo
                            </Link>
                          </Button>
                          <Button variant="outline" className="flex-1" asChild>
                            <Link href={project.github_link} target="_blank">
                              <Github className="h-4 w-4 mr-2 shrink-0" />
                              Source Code
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Regular Projects - Grid Layout */}
          {regularProjects.length > 0 && (
            <>
              <h3 className="text-2xl font-semibold mb-6">More Projects</h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {regularProjects.map((project) => (
                  <motion.div key={project.title} variants={itemVariants}>
                    <Card className="group h-full bg-card border-border hover:border-primary/30 transition-all duration-300 overflow-hidden">
                      {/* Image - Fixed for mobile */}
                      <div className="relative h-48 w-full overflow-hidden bg-muted">
                        <Image
                          alt={project.title}
                          src={project.image_src}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 right-3 z-10">
                          <Badge
                            variant="secondary"
                            className="text-white bg-black/70 backdrop-blur-sm"
                          >
                            {project.year}
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="capitalize">
                            {project.category}
                          </Badge>
                        </div>

                        <CardTitle className="text-lg font-semibold mb-2 line-clamp-1">
                          {project.title}
                        </CardTitle>

                        <CardDescription className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {project.description}
                        </CardDescription>

                        {/* Tech badges */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.badges.slice(0, 3).map((badge, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="text-xs"
                            >
                              {badge}
                            </Badge>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button size="sm" className="flex-1" asChild>
                            <Link href={project.visit_link} target="_blank">
                              <ExternalLink className="h-3 w-3 mr-1 shrink-0" />
                              Demo
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            asChild
                          >
                            <Link href={project.github_link} target="_blank">
                              <Github className="h-3 w-3 mr-1 shrink-0" />
                              Code
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}

          {/* View all link */}
          {filteredProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-center mt-16"
            >
              <Button
                variant="outline"
                size="lg"
                className="rounded-full"
                asChild
              >
                <Link href="https://github.com/apiz23" target="_blank">
                  <span className="mr-2">View all on GitHub</span>
                  <Github className="h-4 w-4 shrink-0" />
                  <ArrowRight className="h-4 w-4 ml-2 shrink-0" />
                </Link>
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
