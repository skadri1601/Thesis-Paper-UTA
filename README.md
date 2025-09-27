# Thesis Portal - UTA

A comprehensive thesis management system built with Next.js for academic institutions. This platform facilitates the submission, review, and management of academic theses with role-based access control and notification systems.

## Team Members

- **Kadri Saad** - 1002153702
- **Gundebommu Prabhakar** - 1002129227
- **Yuva Teja Kadari** - 1002162449
- **Sharath Chandhra Yadav Gori** - 1002163921
- **Gajjar Vashishth** - 1002160256

## Features

- **User Management**: Registration and authentication for authors and reviewers
- **Thesis Submission**: Upload and manage thesis documents with metadata
- **Review System**: Comprehensive peer review workflow with comments
- **Notification System**: Real-time notifications for thesis status updates
- **Role-based Access**: Different permissions for authors, reviewers, and administrators
- **Document Management**: Secure file upload and storage
- **Search & Discovery**: Browse theses by keywords, authors, and publication year

## Technology Stack

- **Frontend**: React 19 (RC), Next.js 15
- **Backend**: Next.js API Routes
- **Database**: MySQL with Prisma ORM
- **Authentication**: JWT with bcrypt password hashing
- **File Upload**: Multer middleware
- **Email**: Nodemailer for notifications
- **CORS**: Configured for cross-origin requests

## Database Schema

The application uses a relational database with the following main entities:

- **Users**: Authors, reviewers, and administrators
- **Thesis**: Academic papers with metadata and review status
- **Comments**: Review feedback and discussions
- **Notifications**: System-wide announcements
- **NotificationAudit**: Tracking notification delivery status

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MySQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Thesis-Paper-UTA
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/thesis_portal"
   JWT_SECRET="your-jwt-secret-key"
   EMAIL_HOST="your-smtp-host"
   EMAIL_PORT=587
   EMAIL_USER="your-email@domain.com"
   EMAIL_PASS="your-email-password"
   ```

4. **Database Setup**
   ```bash
   # Initialize Prisma
   npx prisma generate

   # Run database migrations
   npx prisma migrate dev --name init

   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at [http://localhost:4000](http://localhost:4000)

## API Endpoints

### Authentication
- `POST /api/login` - User authentication
- `POST /api/users` - User registration

### Thesis Management
- `GET /api/thesis` - Retrieve theses
- `POST /api/thesis` - Submit new thesis
- `PUT /api/thesis` - Update thesis
- `DELETE /api/thesis` - Delete thesis

### Comments & Reviews
- `GET /api/comment` - Get comments for a thesis
- `POST /api/comment` - Add review comment
- `PUT /api/comment` - Update comment
- `DELETE /api/comment` - Delete comment

### Notifications
- `GET /api/notification` - Get user notifications
- `POST /api/notification` - Create notification
- `PUT /api/notification` - Mark notification as read
- `DELETE /api/notification` - Delete notification

### Contact
- `POST /api/contectUs` - Contact form submission

## Development

### Project Structure
```
├── pages/
│   ├── api/                    # API routes
│   │   ├── thesis_utils/       # Thesis CRUD operations
│   │   ├── user_utils/         # User management
│   │   ├── comment_utils/      # Comment system
│   │   └── notification_utils/ # Notification system
│   └── _app.js                 # Next.js app configuration
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── lib/
│   ├── prisma.js             # Prisma client configuration
│   ├── cors.js               # CORS middleware
│   └── multerConfig.js       # File upload configuration
├── middleware/
│   └── auth.js               # Authentication middleware
└── next.config.mjs           # Next.js configuration
```

### Scripts

- `npm run dev` - Start development server on port 4000
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Database Management

```bash
# View database in Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset

# Deploy migrations to production
npx prisma migrate deploy
```

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection configured
- SQL injection prevention through Prisma
- File upload size limits (100MB)
- Environment variable protection

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is developed as part of academic coursework at the University of Texas at Arlington (UTA).

## Support

For support and questions, please contact the development team or create an issue in the repository.
