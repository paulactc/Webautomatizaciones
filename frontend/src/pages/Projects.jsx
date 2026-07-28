import { projects } from "../data/projects.js";
import ProjectCard from "../components/ProjectCard.jsx";

export default function Projects() {
  return (
    <section className="projects-section">
      <div className="container">
        <h2 className="projects-section__heading">Proyectos</h2>
        <div className="projects-section__stack">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} total={projects.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
