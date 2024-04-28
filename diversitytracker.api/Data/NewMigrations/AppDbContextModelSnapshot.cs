﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using diversitytracker.api.Data;

#nullable disable

namespace diversitytracker.api.Data.NewMigrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("diversitytracker.api.Models.FormSubmission", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("PersonId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("PersonId");

                    b.ToTable("FormSubmissionsData");
                });

            modelBuilder.Entity("diversitytracker.api.Models.OpenAi.AiAnswerData", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("WordLength")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("AiAnswerData");
                });

            modelBuilder.Entity("diversitytracker.api.Models.OpenAi.AiInterpretation", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RealDataInterpretation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ReflectionsInterpretation")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("AiInterpretations");
                });

            modelBuilder.Entity("diversitytracker.api.Models.OpenAi.AiQuestionInterpretation", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("AiInterpretationId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("AnswerInterpretation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("QuestionTypeId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ValueInterpretation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("aiAnswerDataId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("AiInterpretationId");

                    b.HasIndex("QuestionTypeId");

                    b.HasIndex("aiAnswerDataId");

                    b.ToTable("AiQuestionInterpretation");
                });

            modelBuilder.Entity("diversitytracker.api.Models.Person", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("Age")
                        .HasColumnType("int");

                    b.Property<int>("Gender")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PersonalReflection")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TimeAtCompany")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("People");
                });

            modelBuilder.Entity("diversitytracker.api.Models.Question", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Answer")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FormSubmissionId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("QuestionTypeId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<double>("Value")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("FormSubmissionId");

                    b.HasIndex("QuestionTypeId");

                    b.ToTable("Question");
                });

            modelBuilder.Entity("diversitytracker.api.Models.QuestionType", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("QuestionTypes");
                });

            modelBuilder.Entity("diversitytracker.api.Models.FormSubmission", b =>
                {
                    b.HasOne("diversitytracker.api.Models.Person", "Person")
                        .WithMany("FormSubmissions")
                        .HasForeignKey("PersonId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Person");
                });

            modelBuilder.Entity("diversitytracker.api.Models.OpenAi.AiQuestionInterpretation", b =>
                {
                    b.HasOne("diversitytracker.api.Models.OpenAi.AiInterpretation", null)
                        .WithMany("QuestionInterpretations")
                        .HasForeignKey("AiInterpretationId");

                    b.HasOne("diversitytracker.api.Models.QuestionType", "QuestionType")
                        .WithMany()
                        .HasForeignKey("QuestionTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("diversitytracker.api.Models.OpenAi.AiAnswerData", "aiAnswerData")
                        .WithMany()
                        .HasForeignKey("aiAnswerDataId");

                    b.Navigation("QuestionType");

                    b.Navigation("aiAnswerData");
                });

            modelBuilder.Entity("diversitytracker.api.Models.Question", b =>
                {
                    b.HasOne("diversitytracker.api.Models.FormSubmission", "FormSubmission")
                        .WithMany("Questions")
                        .HasForeignKey("FormSubmissionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("diversitytracker.api.Models.QuestionType", "QuestionType")
                        .WithMany()
                        .HasForeignKey("QuestionTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("FormSubmission");

                    b.Navigation("QuestionType");
                });

            modelBuilder.Entity("diversitytracker.api.Models.FormSubmission", b =>
                {
                    b.Navigation("Questions");
                });

            modelBuilder.Entity("diversitytracker.api.Models.OpenAi.AiInterpretation", b =>
                {
                    b.Navigation("QuestionInterpretations");
                });

            modelBuilder.Entity("diversitytracker.api.Models.Person", b =>
                {
                    b.Navigation("FormSubmissions");
                });
#pragma warning restore 612, 618
        }
    }
}
