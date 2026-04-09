"use client";

import React, { createContext, useContext, useState } from "react";

export interface DemoDocument {
  id: string;
  title: string;
  content: string;
  icon?: string;
  coverImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface DemoContextType {
  isDemoMode: boolean;
  demoDocuments: DemoDocument[];
  addDocument: (document: DemoDocument) => void;
  updateDocument: (id: string, updates: Partial<DemoDocument>) => void;
  deleteDocument: (id: string) => void;
  getDocument: (id: string) => DemoDocument | undefined;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [demoDocuments, setDemoDocuments] = useState<DemoDocument[]>([
    {
      id: "welcome-guide",
      title: "Welcome to ZenHub",
      content: `## Getting Started with ZenHub

Welcome to ZenHub - your connected workspace for beautiful, organized documents. Here's what you can do:

### Create & Edit
- Write rich, formatted documents with ease
- Use the toolbar to format text, add headings, lists, and more
- Enjoy a distraction-free writing experience

### Collaborate
- Share documents with your team
- Work together in real-time
- Leave comments and feedback

### Customize
- Add document icons and cover images
- Organize documents in a hierarchy
- Create the workspace that works for you

### Share & Publish
- Share documents with specific people
- Publish documents publicly
- Control permissions and access levels

Start exploring by creating a new document or editing this one! Click anywhere to start typing.`,
      icon: "👋",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "project-planning",
      title: "Project Planning Template",
      content: `# Q1 2025 Project Planning

## Overview
This template helps you organize and track projects effectively.

### Key Objectives
- Define clear project goals
- Assign responsibilities
- Track progress and milestones
- Communicate updates

## Projects

### Website Redesign
- **Status**: In Progress
- **Timeline**: Jan - Feb 2025
- **Team**: Design & Frontend
- **Deliverables**:
  - New landing page design
  - Responsive mobile layout
  - Performance optimization

### Mobile App Launch
- **Status**: Planning
- **Timeline**: Mar - Apr 2025
- **Team**: Mobile & Backend
- **Deliverables**:
  - iOS and Android apps
  - Backend APIs
  - Testing and QA

### Documentation Update
- **Status**: In Progress
- **Timeline**: Jan - Mar 2025
- **Owner**: Tech Writer
- **Deliverables**:
  - API documentation
  - User guides
  - Video tutorials`,
      icon: "📋",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "product-roadmap",
      title: "Product Roadmap 2025",
      content: `# ZenHub Product Roadmap 2025

## Vision
Build the most intuitive and powerful document collaboration platform.

## Q1 2025 - Foundations
### Features
- **Improved Editor**
  - Better formatting options
  - Code block support
  - Table editor

- **Collaboration Tools**
  - Comment threads
  - @mentions
  - Real-time cursors

### Improvements
- Performance optimization
- Mobile app refinement
- Dark mode enhancements

## Q2 2025 - Growth
- Advanced permissions system
- API access for integrations
- Templates gallery
- Webhook support

## Q3 2025 - Enterprise
- Single sign-on (SSO)
- Advanced analytics
- Audit logs
- Custom branding

## Q4 2025 - Excellence
- AI-powered features
- Advanced search
- Backup & export
- Mobile offline support

---
**Note**: This roadmap is subject to change based on user feedback and priorities.`,
      icon: "🗺️",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "team-notes",
      title: "Team Meeting Notes",
      content: `# Weekly Team Meeting - January 15, 2025

## Attendees
- Product Lead
- Engineering Manager
- Design Lead
- QA Lead

## Agenda Items

### 1. Website Redesign Progress
- Landing page mockups completed
- Mobile layout in review
- **Action Items**:
  - [ ] Get stakeholder approval by Friday
  - [ ] Start frontend implementation
  - [ ] Schedule user testing session

### 2. Mobile App Roadmap
- Feature set finalized
- Development timeline: 8 weeks
- **Decisions**:
  - Use React Native for cross-platform development
  - Target iOS 14+ and Android 11+

### 3. Q1 Goals Review
- On track with timeline
- Need to allocate more resources to testing
- Documentation needs attention

### 4. Team Updates
- 2 new team members joining next week
- Onboarding plan in place
- Mentoring assignments complete

## Next Meeting
January 22, 2025 at 2:00 PM

---
**Recorded by**: Meeting Assistant
**Last Updated**: January 15, 2025`,
      icon: "📝",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const addDocument = (document: DemoDocument) => {
    setDemoDocuments((prev) => [...prev, document]);
  };

  const updateDocument = (id: string, updates: Partial<DemoDocument>) => {
    setDemoDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? { ...doc, ...updates, updatedAt: new Date() }
          : doc
      )
    );
  };

  const deleteDocument = (id: string) => {
    setDemoDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  const getDocument = (id: string) => {
    return demoDocuments.find((doc) => doc.id === id);
  };

  return (
    <DemoContext.Provider
      value={{
        isDemoMode: true,
        demoDocuments,
        addDocument,
        updateDocument,
        deleteDocument,
        getDocument,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemo must be used within a DemoProvider");
  }
  return context;
}
