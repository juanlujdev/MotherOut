﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MotherOut_BackEnd.Models;

namespace MotherOut.Migrations
{
    [DbContext(typeof(MotherOutContext))]
    [Migration("20210203181719_m1")]
    partial class m1
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("MotherOut_BackEnd.Models.Icon", b =>
                {
                    b.Property<int>("IconId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<byte[]>("IconImage")
                        .HasColumnType("longblob");

                    b.Property<int>("UserTaskId")
                        .HasColumnType("int");

                    b.HasKey("IconId");

                    b.HasIndex("UserTaskId");

                    b.ToTable("Icons");
                });

            modelBuilder.Entity("MotherOut_BackEnd.Models.PreDefinedTask", b =>
                {
                    b.Property<int>("PredifId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<byte[]>("TaskIcon")
                        .HasColumnType("longblob");

                    b.Property<string>("TaskName")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("TaskScore")
                        .HasColumnType("int");

                    b.Property<int>("UserTaskId")
                        .HasColumnType("int");

                    b.HasKey("PredifId");

                    b.HasIndex("UserTaskId");

                    b.ToTable("PreDefinedTasks");
                });

            modelBuilder.Entity("MotherOut_BackEnd.Models.Team", b =>
                {
                    b.Property<int>("IdTeam")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("TeamMembers")
                        .HasColumnType("int");

                    b.Property<string>("TeamName")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("IdTeam");

                    b.ToTable("Teams");
                });

            modelBuilder.Entity("MotherOut_BackEnd.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<byte[]>("Avatar")
                        .HasColumnType("longblob");

                    b.Property<string>("Email")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<bool>("Help")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("NTaks")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("TeamId")
                        .HasColumnType("int");

                    b.Property<bool>("UserMaster")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("UserScore")
                        .HasColumnType("int");

                    b.Property<string>("password")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("UserId");

                    b.HasIndex("TeamId")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("MotherOut_BackEnd.Models.UserTask", b =>
                {
                    b.Property<int>("UserTaskId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<bool>("Done")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("IdTeam")
                        .HasColumnType("int");

                    b.Property<DateTime>("SelectDay")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("SelectMember")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<byte[]>("TaskIcon")
                        .HasColumnType("longblob");

                    b.Property<string>("TaskName")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("TaskScore")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("UserTaskId");

                    b.HasIndex("UserId");

                    b.ToTable("UserTasks");
                });

            modelBuilder.Entity("MotherOut_BackEnd.Models.Icon", b =>
                {
                    b.HasOne("MotherOut_BackEnd.Models.UserTask", "UserTask")
                        .WithMany("Icons")
                        .HasForeignKey("UserTaskId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("MotherOut_BackEnd.Models.PreDefinedTask", b =>
                {
                    b.HasOne("MotherOut_BackEnd.Models.UserTask", "Task")
                        .WithMany("PreDefinedTasks")
                        .HasForeignKey("UserTaskId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("MotherOut_BackEnd.Models.User", b =>
                {
                    b.HasOne("MotherOut_BackEnd.Models.Team", "Team")
                        .WithOne("User")
                        .HasForeignKey("MotherOut_BackEnd.Models.User", "TeamId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("MotherOut_BackEnd.Models.UserTask", b =>
                {
                    b.HasOne("MotherOut_BackEnd.Models.User", "User")
                        .WithMany("UserTasks")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
