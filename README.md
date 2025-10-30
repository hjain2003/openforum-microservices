# OpenForum - Microservices Architecture

A Reddit-like social media platform built with microservices architecture, featuring a React frontend and two Node.js backend services for posts and comments. The application is containerized with Docker and deployed on AWS ECS with Application Load Balancer for path-based routing.

## 🏗️ Architecture Overview

This project implements a microservices architecture with the following components:

- **Frontend**: React application serving the user interface
- **Post Service**: Node.js microservice handling post-related operations
- **Comment Service**: Node.js microservice managing comments functionality
- **Infrastructure**: AWS ECS cluster with ALB for load balancing and routing
- **CI/CD**: Jenkins pipelines for automated deployment

![Architecture Diagram](https://raw.githubusercontent.com/hjain2003/openforum-microservices/main/images/alb-path-routing.png)


## 📁 Project Structure

```
├── comment-service/          # Comment microservice
│   ├── controllers/         # Business logic controllers
│   ├── db/                  # Database connection
│   ├── models/              # Data models
│   ├── routes/              # API routes
│   ├── app.js               # Express application
│   ├── Dockerfile           # Container configuration
│   ├── Jenkinsfile          # CI/CD pipeline
│   └── package.json         # Dependencies
├── frontend/                # React frontend application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── add-post-popup/
│   │   │   ├── comment-popup/
│   │   │   └── home/
│   │   └── App.js           # Main application component
│   ├── Dockerfile           # Container configuration
│   ├── Jenkinsfile          # CI/CD pipeline
│   └── package.json         # Dependencies
├── Infra-Pipeline/          # Terraform infrastructure
│   ├── alb/                 # Application Load Balancer
│   ├── alb-routing/         # ALB routing rules
│   ├── ecr-repos/           # ECR repositories
│   ├── ecs-cluster/         # ECS cluster configuration
│   ├── main.tf              # Main infrastructure
│   └── Jenkinsfile          # Infrastructure pipeline
├── post-service/            # Post microservice
│   ├── controllers/         # Business logic controllers
│   ├── db/                  # Database connection
│   ├── models/              # Data models
│   ├── routes/              # API routes
│   ├── app.js               # Express application
│   ├── Dockerfile           # Container configuration
│   ├── Jenkinsfile          # CI/CD pipeline
│   └── package.json         # Dependencies
├── docker-compose.yml       # Local development setup
└── README.md               # Project documentation
```

## 🚀 Features

- **Create Posts**: Users can create new posts with title and content
- **View Posts**: Browse all posts in a feed-like interface
- **Add Comments**: Comment on posts with real-time updates
- **Responsive UI**: Mobile-friendly React interface
- **Microservices**: Scalable architecture with separate services
- **Container Ready**: Fully containerized with Docker
- **Cloud Native**: Deployed on AWS ECS with load balancing

## 🛠️ Technology Stack

### Frontend
- **React**: User interface framework
- **CSS3**: Styling and responsive design
- **Axios**: HTTP client for API calls

### Backend Services
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling

### Infrastructure
- **AWS ECS**: Container orchestration
- **AWS ALB**: Application Load Balancer
- **AWS S3** & **AWS DynamoDB**: Terraform state storage and locking
- **AWS ECR**: Container registry
- **Docker**: Containerization
- **Terraform**: Infrastructure as Code (IaC)
- **Jenkins**: CI/CD pipelines

## 🔧 Local Development

### Prerequisites
- Node.js (v14+)
- MongoDB
- Docker & Docker Compose
- Git

### Environment Setup

Create `.env` files in each service directory:

**Frontend (frontend/.env)**
```env
REACT_APP_POST_API=http://localhost:5001
REACT_APP_COMMENT_API=http://localhost:5002
```

**Post Service (post-service/.env)**
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/reddit-posts
```

**Comment Service (comment-service/.env)**
```env
PORT=5002
MONGODB_URI=mongodb://localhost:27017/reddit-comments
```

### Running Locally

#### Option 1: Using Docker Compose (Recommended)
```bash
# Clone the repository
git clone <repository-url>
cd reddit-clone

# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Post Service: http://localhost:5001
# Comment Service: http://localhost:5002
```

#### Option 2: Manual Setup
```bash
# Start MongoDB
mongod

# Install and run Post Service
cd post-service
npm install
npm start

# Install and run Comment Service
cd ../comment-service
npm install
npm start

# Install and run Frontend
cd ../frontend
npm install
npm start
```

The application will be available at `http://localhost:3000`

## 🌐 Production Deployment

### AWS Architecture

The production environment uses:

- **ECS Cluster**: Hosts containerized services
- **Application Load Balancer**: Routes traffic based on paths
  - `/` → Frontend service
  - `/api/post*` → Post service
  - `/api/comment*` → Comment service
- **Target Groups**: One for each service (3 total)
- **ECR Repositories**: Store Docker images (3 total)
- **Task Definitions**: Define container specifications (3 total)

### CI/CD Pipelines

#### Infrastructure Pipeline
Located in `Infra-Pipeline/Jenkinsfile`
- Deploys ALB, routing rules, target groups
- Creates ECS cluster, task definitions, and services
- Sets up ECR repositories

#### Application Pipelines
Each service has its own pipeline:
1. **Checkout**: Pull code from repository
2. **Docker Build**: Create container image
3. **Docker Tag**: Tag image for ECR
4. **Docker Push**: Push to ECR registry
5. **Update Service**: Deploy new task definition and update ECS service

### Deployment Steps

1. **Infrastructure Deployment**
   ```bash
   cd Infra-Pipeline
   # Run Jenkins pipeline or manual Terraform
   terraform init
   terraform plan
   terraform apply
   ```

2. **Application Deployment**
   - Trigger Jenkins pipelines for each service
   - Or manually build and push images to ECR
   - Update ECS services with new task definitions

## 📊 API Endpoints

### Post Service (`/api/post`)
- `GET /api/post` - Retrieve all posts
- `POST /api/post` - Create a new post
- `GET /api/post/:id` - Get specific post
- `PUT /api/post/:id` - Update post
- `DELETE /api/post/:id` - Delete post

### Comment Service (`/api/comment`)
- `GET /api/comment/:postId` - Get comments for a post
- `POST /api/comment` - Create a new comment
- `PUT /api/comment/:id` - Update comment
- `DELETE /api/comment/:id` - Delete comment

## 🔍 Monitoring and Troubleshooting

### Logs
- **ECS**: Check CloudWatch logs for each service
- **ALB**: Monitor access logs and target group health
- **Local**: Use `docker-compose logs <service-name>`

### Health Checks
Each service includes health check endpoints:
- Frontend: Available on port 3000
- Post Service: `GET /health` on port 5001
- Comment Service: `GET /health` on port 5002

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Note**: This is a demonstration project showcasing microservices architecture, containerization, and cloud deployment practices. The application runs without authentication for simplicity.
